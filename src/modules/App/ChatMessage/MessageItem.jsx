import classNames from 'classnames'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import styles from './ChatMessage.module.scss'

const otherSrc = 'public/assets/lee.jpeg'

const MessageItem = props => {
  const { userInfo, nextIsSame, message } = props
  const { timestamp, content } = message
  // todo: need to get target user img src

  let me = 'viola'
  let isMe = message['sent_from_id'] === me
  const formattedTime = dayjs(timestamp).format('MM/DD HH:mm')

  // console.log('--nextIsSame', nextIsSame)
  return (
    <div
      className={classNames({
        [styles['comment-container']]: isMe,
        [styles['comment-other-container']]: !isMe,
      })}
    >
      {(!isMe && !nextIsSame) && (
        <div className={styles['img-container']}>
          <img
            src={otherSrc}
            alt={'other'}
          />
        </div>
      )}
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
  nextIsSame: PropTypes.bool
}

MessageItem.defaultProps = {
  userInfo: {},
}

export default MessageItem
