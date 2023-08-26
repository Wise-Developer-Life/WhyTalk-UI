import { useState } from 'react'
import classNames from "classnames";
import useFetchHistory from '../../../api/hooks/useFetchHistory.jsx'
import styles from '../App.module.scss'
import historyStyles from './atoms.module.scss'

const ChatMessage = () => {
  const { histories, fetchMessageHistory } = useFetchHistory({})
  const [messages, setMessages] = useState([])

  console.log('-histories--', histories)

  return (
    <div className={styles['message-container']}>
      <div style={{
        minHeight: '100%',
      }}>
        {histories.value.map((history, idx) => {
          let me = 'viola'
          let isMe = history['sent_from_id'] === me

          return (
            <div
              key={history?.['message_id'] || `msg-${idx}`}
              className={classNames({
                [historyStyles['comment-me']]: isMe,
                [historyStyles['comment-other']]: !isMe,
              })}
            >
              <div className={historyStyles.bubble}>
                {`${history.content}`}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ChatMessage
