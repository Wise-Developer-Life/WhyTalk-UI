import PropTypes from 'prop-types'
import { useEffect } from 'react'
import styles from './ChatMessage.module.scss'
import MultiCircleLoading from '../../../fallbacks/loaders/MultiCircleLoading/index.jsx'
import useInView from '../../../hooks/useInView.jsx'

const HeaderLoader = props => {
  const { containerRef, dirtyRef, fetchCallback } = props

  const { targetRef, isIntersecting } = useInView({
    root: containerRef,
  })

  useEffect(() => {
    // initial fetch will set footer dirty and do nothing
    if (!dirtyRef.current && isIntersecting) {
      dirtyRef.current = true
    } else {
      if (isIntersecting) {
        fetchCallback()
      }
    }

    // return () => { console.log('---unmount!')}
  }, [isIntersecting])

  return (
    <div
      className={styles['loading-container']}
      ref={targetRef}
    >
      <MultiCircleLoading />
      <p
        style={{
          fontSize: '13px',
          fontStyle: 'italic',
        }}
      >
        Loading...
      </p>
    </div>
  )
}

HeaderLoader.propTypes = {
  containerRef: PropTypes.object,
  dirtyRef: PropTypes.object,
  fetchCallback: PropTypes.func,
}
export default HeaderLoader
