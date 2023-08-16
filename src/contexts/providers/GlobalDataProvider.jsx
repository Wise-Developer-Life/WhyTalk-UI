import PropTypes from 'prop-types'
import { useReducer, useState } from 'react'
import {
  apiDataReducer,
  DATA_STATE,
  getInitialState,
} from '../../reducers/index.js'
import { GlobalDataContext } from '../contextStores.js'
import { LOGIN_STATE } from '../const.js'
import { TOKEN_NAME } from '../../const.js'

const GlobalDataProvider = props => {
  const { children } = props

  // local states
  const [loginState, setLoginState] = useState(() => {
    const storageToken = JSON.parse(localStorage.getItem(TOKEN_NAME))
    switch (storageToken) {
      case '':
      case null:
        return LOGIN_STATE.logout
      default:
        return LOGIN_STATE.login
    }
  })

  // user profile
  const [userProfile, dispatchUserProfile] = useReducer(
    apiDataReducer,
    getInitialState({})
  )

  const cleanupGlobalStates = () => {
    setLoginState(LOGIN_STATE.init)
    dispatchUserProfile({ type: DATA_STATE.init })
  }

  return (
    <GlobalDataContext.Provider
      value={{
        loginState,
        setLoginState,
        userProfile,
        dispatchUserProfile,
        cleanupGlobalStates,
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  )
}

GlobalDataProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default GlobalDataProvider
