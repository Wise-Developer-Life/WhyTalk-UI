import styles from '../styles.module.scss'
import googleIcon from '../../../../asstes/icon-google.svg'

const GoogleLoginButton = props => {
  return (
    <button
      className={styles['google-login-btn']}
      type="submit"
      {...props}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          style={{
            width: 20,
            height: 20,
            margin: '0 .5em',
          }}
          src={googleIcon}
          alt="logo"
        />
        <span>Continue with Google</span>
      </div>
    </button>
  )
}

export default GoogleLoginButton
