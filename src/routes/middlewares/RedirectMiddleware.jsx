import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import { ROUTES_CONFIG } from '../const.js'
import { useGlobalDataContext } from '../../contexts/contextStores.js'
import { LOGIN_STATE } from '../../contexts/const.js'

const RedirectMiddleware = props => {
  const { children } = props
  const { pathname } = useLocation()

  // match all query string pairs
  // const queryMap = getUrlQueryMap()

  // hooks
  // todo: fix async localstorage token
  const { loginState } = useGlobalDataContext()

  if (
    ([LOGIN_STATE.init, LOGIN_STATE.logout].includes(loginState) &&
      pathname !== ROUTES_CONFIG.ROOT.route) ||
    (loginState === LOGIN_STATE.login && pathname === `/**ready-to-login`)
  ) {
    const queryParams = window.location.search
    return (
      <Navigate
        to={`${ROUTES_CONFIG.ROOT.route}${queryParams}`}
        replace
      />
    )
  }

  return <>{children}</>
}

RedirectMiddleware.propTypes = {
  children: PropTypes.element.isRequired,
}
export default RedirectMiddleware
