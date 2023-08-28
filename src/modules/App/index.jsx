import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.module.scss'
import styles from './App.module.scss'
import ChatMessage from '../App/ChatMessage/index'
import Profile from '../../components/Profile/index.jsx'
import MessageFooter from './MessageFooter/index.jsx'

function App() {
  return (
    <section className={styles['landing-page-container']}>
      <div className={styles['grid-item-header']}>
        <Profile />
      </div>
      <div className={styles['grid-item-nav']}>nav</div>
      <div className={styles['grid-item-main']}>main</div>
      <div className={styles['grid-item-dialog']}>
        <ChatMessage />
      </div>
      <div className={styles['grid-item-input']}>
        <MessageFooter />
      </div>
    </section>
  )
}

export default App
