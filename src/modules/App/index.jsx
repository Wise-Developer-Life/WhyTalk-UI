import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.module.scss'
import styles from './App.module.scss'
import ChatMessage from '../App/ChatMessage/index'
import Profile from '../../components/Profile/index.jsx'
import MessageInput from './MessageInput'
import MessageFooter from './MessageFooter/index.jsx'
import ChatList from "./ChatList/index.jsx";

function App() {
  return (
    <section className={styles['landing-page-container']}>
      <div className={styles['grid-item-header']}>header</div>
      <div className={styles['grid-item-nav']}>
        <div>upper nav</div>
        <Profile />
      </div>
      <div className={styles['grid-item-main-header']}>
        <div style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '8px 24px',
          fontWeight: '600',
          fontSize: '20px',
        }}>
          Chats
        </div>
      </div>
      <div className={styles['grid-item-main']}>
        <ChatList />
      </div>
      <div className={styles['grid-item-dialog']}>
        <ChatMessage />
      </div>
      <div className={styles['grid-item-input']}>
        <MessageInput />
      </div>
      <div className={styles['grid-item-footer']}>
        <MessageFooter />
      </div>
    </section>
  )
}

export default App
