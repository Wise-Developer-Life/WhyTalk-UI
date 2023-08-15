import { useState, useEffect } from 'react'

function useWindowSize() {
  const [inner, setInner] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })

  useEffect(() => {
    const onSize = () => {
      setInner({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }

    window.addEventListener('resize', onSize)

    return () => {
      window.removeEventListener('resize', onSize)
    }
  }, [])

  return {
    height: inner.height,
    width: inner.width,
  }
}
export default useWindowSize
