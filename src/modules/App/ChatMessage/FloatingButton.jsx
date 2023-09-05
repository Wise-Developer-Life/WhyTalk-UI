import { memo } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@tonic-ui/react'
import styles from './ChatMessage.module.scss'

const FloatingButton = memo(props => {
  const { isShown, callback } = props

  return isShown ? (
    <div
      className={styles['floating-btn-container']}
      onClick={callback}
    >
      <Icon icon="arrow-down" />
    </div>
  ) : (
    <></>
  )
})

FloatingButton.propTypes = {
  isShown: PropTypes.bool,
  callback: PropTypes.func,
}

FloatingButton.displayName = 'FloatingButton'

export default FloatingButton
