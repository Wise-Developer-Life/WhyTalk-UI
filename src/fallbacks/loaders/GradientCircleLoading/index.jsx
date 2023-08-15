import { Text } from '@tonic-ui/react'
import styles from './styles.module.scss'
const JumpbarLoading = () => {
  return (
    <div className={styles.ring}>
      <Text size="sm">Loading...</Text>
    </div>
  )
}

export default JumpbarLoading
