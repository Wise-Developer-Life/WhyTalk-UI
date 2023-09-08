import { useCallback, useEffect, useState } from 'react'
import { Icon } from '@tonic-ui/react'
import styles from './styles.module.scss'

const rowLimit = 5

const MessageInput = () => {
  // local state
  const [textValue, setTextValue] = useState('')

  const onChange = useCallback(event => {
    console.log('---onChange')
    if (event.target.value.length < 1000) {
      setTextValue(event.target.value)
    }

    const textareaElem = document.getElementById('msg-textarea')
    const computedStyleObj = getComputedStyle(textareaElem)
    const rowAttributeValue = parseInt(textareaElem?.getAttribute('rows'))

    const rowsNum = Math.round(
      (textareaElem.scrollHeight -
        parseInt(computedStyleObj.paddingTop) -
        parseInt(computedStyleObj.paddingBottom)) /
        parseInt(computedStyleObj.lineHeight)
    )

    console.log('--rowsNum-', rowsNum)

    if (rowsNum !== rowAttributeValue && rowsNum <= rowLimit) {
      textareaElem.setAttribute('rows', rowsNum)
    }
  }, [])

  const onSubmit = () => {
    console.log('---call onSubmit--')
  }

  const onKeyDown = useCallback(event => {
    const key = event.key

    if (event.key === 'Enter') {
      console.log('---only enter')
      // prevent trigger onChange
      event.preventDefault()
      onSubmit()
    }

    if (event.key === 'Enter' && event.shiftKey) {
      console.log('Shift + Enter 被按下')
      event.preventDefault()

      const textareaElem = document.getElementById('msg-textarea')
      const computedStyleObj = getComputedStyle(textareaElem)

      const rowsNum = Math.round(
        (textareaElem.scrollHeight -
          parseInt(computedStyleObj.paddingTop) -
          parseInt(computedStyleObj.paddingBottom)) /
          parseInt(computedStyleObj.lineHeight)
      )

      if (rowsNum + 1 <= rowLimit) {
        textareaElem.setAttribute('rows', rowsNum + 1)
      }
      setTextValue(prev => prev + '\n')
    }

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
  }, [])

  useEffect(() => {
    // mount event listener to textarea
    // const textareaEle = document.getElementById('msg-textarea')
    //
    // if (textareaEle) textareaEle.addEventListener('input', onChange)
    //
    // return () => {
    //   if (textareaEle) textareaEle.removeEventListener('input', onChange)
    // }
  }, [])


  return (
    <section className={styles['message-input-container']}>
      <div className={styles['message-container']}>
        <textarea
          className={styles['message-input']}
          onKeyDown={onKeyDown}
          onChange={onChange}
          id="msg-textarea"
          value={textValue}
          name="msg-textarea"
          rows="1"
        />
        <div className={styles['icon-container']}>
          <Icon
            className={styles['icon-send']}
            onClick={onSubmit}
            icon="send"
            color="blue:50"
          />
        </div>
      </div>
    </section>
  )
}

export default MessageInput
