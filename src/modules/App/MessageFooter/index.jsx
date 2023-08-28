import { Icon } from '@tonic-ui/react'
import styles from './styles.module.scss'

const MessageFooter = () => {
  return (
    <section className={styles['message-footer-container']}>
      <div className={styles['message-container']}>
        <textarea
          className={styles['message-input']}
          id="w3review"
          name="w3review"
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

export default MessageFooter
