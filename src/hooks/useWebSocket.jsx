import { useCallback, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

export const SOCKET_EVENT = {
  messageFromServer: 'message_from_server',
  messageFromClient: 'message_from_client',
  connect: 'connect',
  disconnect: 'disconnect',
}

const useWebSocket = props => {
  const { socketUrl } = props
  // socket instance
  const [ws, setWs] = useState(null)

  // local state to store socket state & message
  const [socketState, setSocketState] = useState('init')
  const [latestMessage, setLatestMessage] = useState({
    value: null,
  })

  // ref
  const isSocketInstanceExisted = useRef(false)

  // callback
  const connectSocketIo = useCallback(() => {
    const socketIo = io(socketUrl, {
      auth: {
        token: 'json-web-token',
      },
    })
    console.log('---connectSocketIo called', socketUrl, socketIo)

    // connect event
    socketIo.on(SOCKET_EVENT.connect, function () {
      setSocketState('connected')
      console.log('client connected successfully: ', socketIo.id)
    })

    // msg from server
    socketIo.on(SOCKET_EVENT.messageFromServer, function (message) {
      // todo: receive message
      console.log('message_from_server message: ', message)

      /* message format:
         { message_id, sent_to_id, sent_from_id, content, timestamp }
      */

      console.log('-latestMessage-', latestMessage)
      // need to use {} object in state
      // because we need every setter to generate new object
      setLatestMessage({ value: message })
    })

    // disconnect event
    socketIo.on(SOCKET_EVENT.disconnect, function () {
      setSocketState('disconnected')
      console.log('disconnect')
    })
    setWs(socketIo)
  }, [setWs, socketUrl])


  const sendMessage = useCallback(
    message => {
      ws.emit(SOCKET_EVENT.messageFromClient, message)
    },
    [ws]
  )

  useEffect(() => {
    if (!isSocketInstanceExisted.current) {
      isSocketInstanceExisted.current = true
      connectSocketIo()
    }
  }, [])

  return {
    sendMessage,
    latestMessage,
    socketState,
  }
}

export default useWebSocket
