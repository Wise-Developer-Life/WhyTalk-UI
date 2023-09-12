import PropTypes from 'prop-types'
import useWebSocket from '../../hooks/useWebSocket.jsx'
import { SocketIoContext } from '../contextStores.js'

// todo: need to extract const to config
const socketUrl = import.meta.env.VITE_APP_SOCKET_URL

const SocketIoProvider = props => {
  const { children } = props

  // hooks
  const { sendMessage, latestMessage, socketState } = useWebSocket({
    socketUrl,
  })

  return (
    <SocketIoContext.Provider
      value={{
        sendMessage,
        latestMessage,
        socketState,
      }}
    >
      {children}
    </SocketIoContext.Provider>
  )
}

SocketIoProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
}

export default SocketIoProvider
