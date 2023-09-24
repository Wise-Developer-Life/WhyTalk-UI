import styles from '../styles.module.scss'

const Divider = () => {
  return (
    <div id={styles['o-auth-divider']}>
      <div className={styles['divider-line']} />
      <div className={styles['divider-txt']}>or</div>
      <div className={styles['divider-line']} />
    </div>
  )
}

export default Divider
