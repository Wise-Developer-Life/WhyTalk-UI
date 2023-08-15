import styles from './styles.module.scss'
const BrickLoading = () => {
  return (
    <div className={styles.loader}>
      <div className={styles['loader-square']}></div>
      <div className={styles['loader-square']}></div>
      <div className={styles['loader-square']}></div>
      <div className={styles['loader-square']}></div>
      <div className={styles['loader-square']}></div>
      <div className={styles['loader-square']}></div>
      <div className={styles['loader-square']}></div>
    </div>
  )
}

export default BrickLoading
