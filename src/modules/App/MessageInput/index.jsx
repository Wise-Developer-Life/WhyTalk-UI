import { useCallback, useEffect } from 'react'
import { Icon } from '@tonic-ui/react'
import styles from './styles.module.scss'

const rowLimit = 5

const MessageInput = () => {
  const onChange = useCallback(() => {
    const textareaElem = document.getElementById('msg-textarea')
    const computedStyleObj = getComputedStyle(textareaElem)
    const rowAttributeValue = parseInt(textareaElem?.getAttribute('rows'))

    const rowsNum = Math.round(
      (textareaElem.scrollHeight -
        parseInt(computedStyleObj.paddingTop) -
        parseInt(computedStyleObj.paddingBottom)) /
        parseInt(computedStyleObj.lineHeight)
    )

    if (rowsNum !== rowAttributeValue && rowsNum <= rowLimit) {
      textareaElem.setAttribute('rows', rowsNum)
    }
  }, [])

  const onKeyDown = event => {
    const key = event.key

    if (key === 'Backspace') {
      const textareaElem = document.getElementById('msg-textarea')
      const rowAttributeValue = parseInt(textareaElem?.getAttribute('rows'))

      const caretPosition = textareaElem.selectionStart
      const contentBeforeCaret = textareaElem.value.slice(0, caretPosition - 1)
      const lineNumber = contentBeforeCaret.split('\n').length

      console.log('--onKeyDown-', caretPosition)
      if (lineNumber !== rowAttributeValue && lineNumber <= rowLimit) {
        textareaElem.setAttribute('rows', lineNumber)
      }
    }
  }

  useEffect(() => {
    // mount event listener to textarea
    const textareaEle = document.getElementById('msg-textarea')

    if (textareaEle) textareaEle.addEventListener('input', onChange)

    return () => {
      if (textareaEle) textareaEle.removeEventListener('input', onChange)
    }
  }, [])

  return (
    <section className={styles['message-input-container']}>
      <div className={styles['message-container']}>
        <textarea
          className={styles['message-input']}
          onKeyDown={onKeyDown}
          id="msg-textarea"
          name="msg-textarea"
          rows="1"
        />
        <div className={styles['icon-container']}>
          <Icon
            className={styles['icon-send']}
            icon="send"
            color="blue:50"
          />
        </div>
      </div>
    </section>
  )
}

export default MessageInput
