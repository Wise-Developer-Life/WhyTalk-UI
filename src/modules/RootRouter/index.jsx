import { useGlobalDataContext } from '../../contexts/contextStores.js'
import { LayoutWrapper } from '../../components/HOC/index.jsx'
import { LOGIN_STATE } from '../../contexts/const.js'
import Index from '../App/index.jsx'
import Login from '../Login/index.jsx'

const WrappedLandingPage = LayoutWrapper(Index)
const WrappedLayoutLogin = LayoutWrapper(Login)

const RootRouter = () => {
  // todo: localstorage logic
  const { loginState } = useGlobalDataContext()

  if (![LOGIN_STATE.login, LOGIN_STATE.processing].includes(loginState)) {
    return <WrappedLayoutLogin />
  }
  return <WrappedLandingPage />
}

export default RootRouter
