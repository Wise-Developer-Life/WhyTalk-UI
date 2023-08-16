import { useNavigate } from 'react-router-dom'
import { asyncLocalStorage } from '../utils/index.js'
import { useGlobalDataContext } from '../contexts/contextStores.js'
import { TOKEN_NAME } from '../const.js'
import { LOGIN_STATE } from '../contexts/const.js'

const useLogout = () => {
  const { setLoginState, cleanupGlobalStates } = useGlobalDataContext()

  // hooks
  const navigate = useNavigate()
  const onLogout = async () => {
    setLoginState(LOGIN_STATE.processing)
    await asyncLocalStorage.removeItem(TOKEN_NAME)
    cleanupGlobalStates()
    setLoginState(LOGIN_STATE.logout)
    navigate({
      pathname: '/**',
      search: window.location.search,
    })
  }

  return { onLogout }
}

export default useLogout
