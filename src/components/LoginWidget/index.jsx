import { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import FormContainer from './atoms/FormContainer.jsx'
import Divider from './atoms/Divider.jsx'
import styles from './styles.module.scss'
import GoogleLoginButton from './atoms/GoogleLoginButton.jsx'

const LoginWidget = () => {
  const [stage, setStage] = useState(1)

  // hooks
  const login = useGoogleLogin({
    onSuccess: codeResponse => console.log(codeResponse),
    flow: 'auth-code',
  })

  const onBackToAccount = () => {
    if (stage !== 1) {
      const el = document.getElementById('login-card')
      el.style.setProperty('--login-card-height', '410px')
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
      {stage === 1 && (
        // o-auth2 section
        <>
          <GoogleLoginButton onClick={() => login()} />
          <Divider />
        </>
      )}
      <FormContainer
        callbacks={[onBackToAccount, setStage]}
        stage={stage}
      />
    </div>
  )
}

export default LoginWidget
