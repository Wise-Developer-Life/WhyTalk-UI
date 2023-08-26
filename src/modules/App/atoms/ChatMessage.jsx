import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { Virtuoso } from 'react-virtuoso'
import useFetchHistory from '../../../api/hooks/useFetchHistory.jsx'
import styles from '../App.module.scss'
import historyStyles from './atoms.module.scss'
import { DATA_STATE } from '../../../reducers/index.js'

const ChatMessage = () => {
  const { histories, fetchMessageHistory } = useFetchHistory({})
  const [messages, setMessages] = useState([])

  // refs
  const virtuoso = useRef(null)
  const historyAnchorRef = useRef(false)

  // console.log('-histories--', histories)

  useEffect(() => {
    if (histories.state === DATA_STATE.ready && !historyAnchorRef.current) {
      virtuoso.current.scrollToIndex({
        index: histories.value.length - 1,
        align: 'start',
        behavior: 'auto',
      })
      historyAnchorRef.current = true
    }
  }, [histories.state])

  return (
    <Virtuoso
      className={styles['message-container']}
      ref={virtuoso}
      data={histories.value}
      itemContent={(idx, history) => {
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
            <div className={historyStyles.bubble}>{`${history.content}`}</div>
          </div>
          // <div className={historyStyles['comment-me']}>hello world</div>
        )
      }}
    />
  )
}

export default ChatMessage
