import classNames from 'classnames'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import styles from './ChatMessage.module.scss'

const MessageItem = props => {
  const { userInfo, message } = props
  const { timestamp, content } = message

  let me = 'viola'
  let isMe = message['sent_from_id'] === me
  const formattedTime = dayjs(timestamp).format('MM/DD HH:mm')

  return (
    <div className={styles['comment-container']}>
      <div
        className={classNames({
          [styles['timestamp-me']]: isMe,
          [styles['timestamp-other']]: !isMe,
        })}
      >
        {formattedTime}
      </div>
      <div
        className={classNames({
          [styles['comment-me']]: isMe,
          [styles['comment-other']]: !isMe,
        })}
      >
        <div className={styles.bubble}>{`${content}`}</div>
      </div>
    </div>
  )
}

MessageItem.propTypes = {
  userinfo: PropTypes.object,
  message: PropTypes.object,
}

MessageItem.defaultProps = {
  userInfo: {},
}

export default MessageItem
