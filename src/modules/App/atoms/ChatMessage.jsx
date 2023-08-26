import { useState } from 'react'
import useFetchHistory from '../../../api/hooks/useFetchHistory.jsx'
import styles from '../App.module.scss'

const ChatMessage = () => {
  const { histories, fetchMessageHistory } = useFetchHistory({})
  const [messages, setMessages] = useState([])

  console.log('-histories--', histories)

  return (
    <div className={styles['message-container']}>
      <div style={{ height: 1300 }}>dialog</div>
    </div>
  )
}

export default ChatMessage
