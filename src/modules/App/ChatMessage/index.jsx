import { useEffect, useRef, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import styles from '../App.module.scss'
import { DATA_STATE } from '../../../reducers/index.js'
import { handleHistoryRequest } from './utils.js'
import { getHistoryMessages } from '../../../api/message.js'
import { AddPropsHOC } from '../../../components/HOC/index.jsx'
import HeaderLoader from './HeaderLoader.jsx'
import MessageItem from './MessageItem.jsx'

const messageSize = 50

const initMessageValue = {
  state: DATA_STATE.init,
  hasPrev: false,
  value: [],
}

const ChatMessage = () => {
  const [messages, setMessages] = useState(initMessageValue)

  // refs
  const virtuoso = useRef(null)
  const historyAnchorRef = useRef(false)
  const viewFromAnchorRef = useRef('init')
  const historyCachedRef = useRef([])
  const headerLoadingDirtyRef = useRef(false)
  const renderCountRef = useRef(0)

  // callbacks
  const handleFetchMessages = async () => {
    try {
      // init to get history
      if (messages.state === DATA_STATE.init) {
        setMessages({
          ...messages,
          state: DATA_STATE.fetching,
        })
        await handleHistoryRequest({
          setter: setMessages,
          fetcher: getHistoryMessages,
          cachedRef: historyCachedRef,
          queries: { size: messageSize },
        })
      } else if (messages.hasPrev) {
        // activate view anchor when scrolling upward
        viewFromAnchorRef.current =
          viewFromAnchorRef.current === '0' ? '1' : '0'
        await handleHistoryRequest({
          setter: setMessages,
          fetcher: getHistoryMessages,
          cachedRef: historyCachedRef,
          queries: { size: messageSize },
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    // init render to get history
    if (renderCountRef.current === 0) {
      renderCountRef.current += 1
      handleFetchMessages()
    }
  }, [])

  useEffect(() => {
    // scroll to bottom when init render
    if (messages.state === DATA_STATE.ready && !historyAnchorRef.current) {
      const historyList = messages.value

      virtuoso.current.scrollToIndex({
        index: historyList.length - 1,
        align: 'start',
        behavior: 'auto',
      })
      historyAnchorRef.current = true
    }
  }, [messages.state])

  useEffect(() => {
    // update view anchor when scrolling upward
    if (viewFromAnchorRef.current !== 'init') {
      virtuoso.current.scrollToIndex({
        index: messageSize,
        align: 'start',
        behavior: 'auto',
      })
    }
  }, [viewFromAnchorRef.current])

  console.log('-messages-', messages)

  return (
    <Virtuoso
      className={styles['message-container']}
      ref={virtuoso}
      data={messages.value}
      itemContent={(idx, historyMsg) => {
        return (
          <MessageItem
            key={historyMsg?.['message_id'] || `msg-${idx}`}
            message={historyMsg}
          />
        )
      }}
      components={{
        Header: messages.hasPrev
          ? AddPropsHOC(HeaderLoader, {
              fetchCallback: handleFetchMessages,
              dirtyRef: headerLoadingDirtyRef,
              // containerRef: virtuoso,
            })
          : () => <></>,
      }}
    />
  )
}

export default ChatMessage
