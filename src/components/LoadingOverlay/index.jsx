import { Modal, ModalBody, ModalOverlay, Spinner } from '@tonic-ui/react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

const LoadingOverlay = props => {
  const { isOpen } = props

  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalBody className={styles.modalBody}>
        <Spinner className={styles.spinner} />
      </ModalBody>
    </Modal>
  )
}

LoadingOverlay.propTypes = {
  isOpen: PropTypes.bool,
}

LoadingOverlay.defaultProps = {
  isOpen: false,
}

export default LoadingOverlay
