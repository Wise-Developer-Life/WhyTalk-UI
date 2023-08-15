import { useEffect, useRef } from 'react'
import { useGlobalDataContext } from '../../contexts/contextStores.js'
import useLogout from '../../hooks/useLogout.jsx'
import { DATA_STATE } from '../../reducers/index.js'
import { getUserProfile } from '../user.js'

const useFetchUserProfile = () => {
  const { userProfile, dispatchUserProfile } = useGlobalDataContext()

  // hooks
  const { onLogout } = useLogout()
  // refs
  const countRef = useRef(0)

  const fetchUserProfile = async () => {
    try {
      dispatchUserProfile({ type: DATA_STATE.fetching })
      const res = await getUserProfile()
      let successRes

      switch (res.status) {
        case 200: {
          successRes = await res.json()

          dispatchUserProfile({
            type: DATA_STATE.ready,
            value: successRes,
          })
          break
        }
        case 401: {
          onLogout()
          break
        }
        case 404:
        case 400:
        case 500:
        default: {
          dispatchUserProfile({
            type: DATA_STATE.failed,
            value: res.statusText,
          })
          break
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if ([DATA_STATE.init, DATA_STATE.reload].includes(userProfile.state)) {
      if (countRef.current !== 1) fetchUserProfile()
    }
    countRef.current += 1
  }, [userProfile.state])

  return { userProfile }
}

export default useFetchUserProfile
