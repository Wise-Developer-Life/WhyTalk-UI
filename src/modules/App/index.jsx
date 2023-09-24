import { useState } from 'react'
import reactLogo from '../../../asstes/react.svg'
import viteLogo from '/vite.svg'
import './App.module.scss'
import styles from './App.module.scss'
import ChatMessage from '../App/ChatMessage/index'
import Profile from '../../components/Profile/index.jsx'
import MessageInput from './MessageInput'
import MessageFooter from './MessageFooter/index.jsx'
import ChatList from './ChatList/index.jsx'
import ChatHeader from './ChatHeader/index.jsx'
import useWindowSize from '../../hooks/useWindowSize.jsx'
import SocketIoProvider from '../../contexts/providers/SocketIoProvider.jsx'
import ChatListHeader from './ChatListHeader/index.jsx'

// todo: extract to api server
const fakeLocalOther = {
  name: 'Lee small boy',
  src: 'public/assets/lee.jpeg',
  content: 'lee boy',
}

function App() {
  console.log('---app render')
  return (
    <section className={styles['landing-page-container']}>
      <div className={styles['grid-item-header']}>
        <ChatHeader user={fakeLocalOther} />
      </div>
      <div className={styles['grid-item-nav']}>
        <>item1</>
        <Profile />
      </div>
      <div className={styles['grid-item-main-header']}>
        <ChatListHeader />
      </div>
      <div className={styles['grid-item-main']}>
        <ChatList />
      </div>
      <SocketIoProvider>
        <div className={styles['grid-item-dialog']}>
          <ChatMessage />
        </div>
        <div className={styles['grid-item-input']}>
          <MessageInput />
        </div>
      </SocketIoProvider>
      <div className={styles['grid-item-footer']}>
        <MessageFooter />
      </div>
    </section>
  )
}

export default App
