import useWindowSize from '../../../hooks/useWindowSize.jsx'

const ChatListHeader = () => {
  // hooks: detect window size
  const { width } = useWindowSize()

  // console.log('--',height, width)
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '8px 24px',
        fontWeight: '600',
        fontSize: '20px',
      }}
    >
      {width > 800 && 'Chats'}
    </div>
  )
}

export default ChatListHeader
