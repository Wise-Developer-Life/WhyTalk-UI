import { Text } from '@tonic-ui/react'
import styles from './styles.module.scss'
const GradientCircleLoading = () => {
  return (
    <div className={styles.ring}>
      <Text size="sm">Loading...</Text>
    </div>
  )
}

export default GradientCircleLoading
