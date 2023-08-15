import PropTypes from 'prop-types'
import styles from '../styles.module.scss'
import { Flex, Space, Spinner } from '@tonic-ui/react'

export const BackAccountLink = props => {
  return (
    <a
      className={styles['back-account']}
      {...props}
    >
      Sign in with a different account
    </a>
  )
}

export const ContinueBtn = props => {
  const { disabled, isLoading, ...otherProps } = props

  if (isLoading) {
    return (
      <button
        className={styles['btn-loading']}
        type="submit"
        disabled={true}
        {...otherProps}
      >
        <Flex justify="center">
          <Flex align="center">
            <Spinner size="xs" />
            <Space width="2x" />
            <span>Loading...</span>
          </Flex>
        </Flex>
      </button>
    )
  }
  return (
    <button
      className={styles['btn']}
      type="submit"
      disabled={disabled}
      {...otherProps}
    >
      Continue
    </button>
  )
}

ContinueBtn.propTypes = {
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
}

ContinueBtn.defaultProps = {
  isLoading: false,
}
