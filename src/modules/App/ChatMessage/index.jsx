import { useCallback, useEffect, useRef, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import styles from '../App.module.scss'
import { DATA_STATE } from '../../../reducers/index.js'
import { handleHistoryRequest } from './utils.js'
import { getHistoryMessages } from '../../../api/message.js'
import { AddPropsHOC } from '../../../components/HOC/index.jsx'
import HeaderLoader from './HeaderLoader.jsx'
import MessageItem from './MessageItem.jsx'
import FloatingButton from './FloatingButton.jsx'
import { connectionStatus, initMessageValue, messageSize } from './const.js'
import { useSocketIoContext } from '../../../contexts/contextStores.js'

/*
 * issue: need to fix floating button,
 * it cause the unexpected rerender when move to the top margin
 *
 * */

const ChatMessage = () => {
  const [messages, setMessages] = useState(initMessageValue)
  const [floatIsShown, setFloatIsShown] = useState(false)

  // hooks
  const { latestMessage, socketState } = useSocketIoContext()

  // refs
  const virtuoso = useRef(null)
  const historyAnchorRef = useRef(false)
  const viewFromAnchorRef = useRef('init')
  const historyCachedRef = useRef([])
  const headerLoadingDirtyRef = useRef(false)
  const renderCountRef = useRef(0)
  const virtuosoScroller = document.querySelector(
    '[data-test-id="virtuoso-scroller"]'
  )

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

  const scrollToBottom = useCallback(() => {
    console.log('-call scrollToBottom', virtuoso)
    virtuoso.current.scrollToIndex({
      index: messages.value.length - 1,
      align: 'end',
      behavior: 'auto',
    })
  }, [messages.value.length])

  // init render to get history
  useEffect(() => {
    if (renderCountRef.current === 0) {
      renderCountRef.current += 1
      handleFetchMessages()
    }
  }, [])

  // show at bottom when init render
  useEffect(() => {
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

  // update view anchor when scrolling upward
  useEffect(() => {
    // todo: refer to doc prepend items
    if (viewFromAnchorRef.current !== 'init') {
      virtuoso.current.scrollToIndex({
        index: messageSize - 1,
        align: 'start',
        behavior: 'auto',
      })
    }
  }, [viewFromAnchorRef.current])

  // handle socket res
  useEffect(() => {
    console.log('--socketState', latestMessage)

    if (socketState === connectionStatus.CONNECTED) {
      // update message
      /*
        { message_id, sent_to_id, sent_from_id, content, timestamp }
      */
      setMessages({
        ...messages,
        value: [...messages.value, latestMessage.value],
      })
    }
  }, [latestMessage])

  console.log('-render-', latestMessage)

  return (
    <>
      <Virtuoso
        className={styles['message-container']}
        ref={virtuoso}
        data={messages.value}
        followOutput={'smooth'}
        itemContent={(idx, historyMsg) => {
          // get to know when to show float button
          if (virtuosoScroller) {
            const bottomSpaceLeftToScroll =
              virtuosoScroller?.scrollHeight -
              virtuosoScroller?.scrollTop -
              virtuosoScroller?.clientHeight
            const scrollerClientHeight = virtuosoScroller?.clientHeight
            if (
              bottomSpaceLeftToScroll > scrollerClientHeight &&
              floatIsShown === false
            ) {
              setFloatIsShown(true)
            } else if (
              bottomSpaceLeftToScroll <= scrollerClientHeight &&
              floatIsShown === true
            ) {
              setFloatIsShown(false)
            }
          }

          // console.log(
          //   '-element--',
          //   virtuosoScroller?.clientHeight,
          //   virtuosoScroller?.scrollHeight -
          //     virtuosoScroller?.scrollTop -
          //     virtuosoScroller?.clientHeight
          // )

          const nextIsSame =
            historyMsg['sent_from_id'] ===
            messages.value[idx + 1]?.['sent_from_id']

          return (
            <MessageItem
              key={historyMsg?.['message_id'] || `msg-${idx}`}
              message={historyMsg}
              nextIsSame={nextIsSame}
            />
          )
        }}
        components={{
          Header: messages.hasPrev
            ? AddPropsHOC(HeaderLoader, {
                fetchCallback: handleFetchMessages,
                dirtyRef: headerLoadingDirtyRef,
              })
            : () => <></>,
        }}
      />
      <FloatingButton
        isShown={floatIsShown}
        callback={scrollToBottom}
      />
    </>
  )
}

export default ChatMessage
