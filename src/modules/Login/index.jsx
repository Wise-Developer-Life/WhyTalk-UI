import styles from './styles.module.scss'
import Footer from './Footer.jsx'
import LoginWidget from '../../components/LoginWidget/index.jsx'

const Login = () => {
  return (
    <section className={styles['login-page-container']}>
      <div className={styles['login-widget-container']}>
        <LoginWidget />
      </div>
      <Footer />
    </section>
  )
}

export default Login
