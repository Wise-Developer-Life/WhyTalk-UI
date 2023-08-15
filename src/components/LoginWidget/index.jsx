import { useState } from 'react'
import FormContainer from './atoms/FormContainer.jsx'
import styles from './styles.module.scss'

const LoginWidget = () => {
  const [stage, setStage] = useState(1)

  const onBackToAccount = () => {
    if (stage !== 1) {
      const el = document.getElementById('login-card')
      el.style.setProperty('--login-card-height', '300px')
      setStage(1)
    }
  }

  return (
    <div
      className={styles['login-card']}
      id="login-card"
    >
      <section className={styles['login-title']}>
        <h1>Login to Your Account</h1>
        <pre>choose your soul mate</pre>
      </section>
      <FormContainer
        callbacks={[onBackToAccount, setStage]}
        stage={stage}
      />
    </div>
  )
}

export default LoginWidget
