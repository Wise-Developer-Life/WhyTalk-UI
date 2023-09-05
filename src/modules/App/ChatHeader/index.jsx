import PropTypes from 'prop-types'
import styles from './ChatHeader.module.scss'

const ChatHeader = props => {
  const { user } = props
  const { name, src } = user

  return (
    <div id={styles['chat-header']}>
      <img
        src={src}
        alt={name}
      />
      <div>{name}</div>
    </div>
  )
}

ChatHeader.propTypes = {
  user: PropTypes.object,
}

ChatHeader.defaultProps = {
  user: {},
}

export default ChatHeader
