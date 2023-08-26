import { useEffect, useRef, useState } from 'react'
import { DATA_STATE } from '../../reducers/index.js'
import { getHistoryMessages } from '../message.js'
import useLogout from '../../hooks/useLogout.jsx'

const useFetchHistory = props => {
  // todo: fetch url queries
  const { userId, chatroomId } = props

  const [histories, setHistories] = useState({
    state: DATA_STATE.init,
    value: [],
  })

  // hooks
  const { onLogout } = useLogout()

  // ref
  const countRef = useRef(0)

  const fetchMessageHistory = async ({ queries }) => {
    try {
      setHistories({
        state: DATA_STATE.fetching,
        value: histories.value,
      })
      const res = await getHistoryMessages({ queries })
      let successRes

      console.log('--res', res)

      switch (res.status) {
        case 200: {
          successRes = await res.json()

          setHistories({
            state: DATA_STATE.ready,
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
          setHistories({
            state: DATA_STATE.failed,
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
    if (countRef.current === 0) {
      countRef.current += 1
      fetchMessageHistory({})
    }
  }, [])

  return {
    histories,
    fetchMessageHistory,
  }
}

export default useFetchHistory
