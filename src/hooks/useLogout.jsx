import { useNavigate } from 'react-router-dom'
import { asyncLocalStorage } from '../utils/index.js'
import { useGlobalDataContext } from '../contexts/contextStores.js'
import { TOKEN_NAME } from '../const.js'

const useLogout = () => {
  const { setLoginState, cleanupGlobalStates } = useGlobalDataContext()

  // hooks
  const navigate = useNavigate()
  const onLogout = async () => {
    setLoginState('processing')
    await asyncLocalStorage.removeItem(TOKEN_NAME)
    cleanupGlobalStates()
    navigate({
      pathname: '/**',
      search: window.location.search,
    })
    setLoginState('logout')
  }

  return { onLogout }
}

export default useLogout
