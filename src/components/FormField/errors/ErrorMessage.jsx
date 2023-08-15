import { useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from '../styles.module.scss'

const ErrorMessage = props => {
  const { error } = props
  const collectedMsg = useRef('')

  const errorMsg = useMemo(() => {
    if (
      (collectedMsg.current === '' && error.message) ||
      (collectedMsg.current !== '' && collectedMsg.current !== error.message)
    ) {
      collectedMsg.current = error.message
    }

    return collectedMsg.current
  }, [error.message])

  return (
    <div
      className={classNames({
        [styles.error]: !error.message,
        [styles['error-show']]: error.message,
      })}
    >
      {errorMsg}
    </div>
  )
}

ErrorMessage.propTypes = {
  error: PropTypes.object,
}

ErrorMessage.defaultProps = {
  error: {},
}

export default ErrorMessage
