import { useEffect, useState } from 'react'

const useResizeObserver = props => {
  const { elementRef } = props

  // states
  const [inner, setInner] = useState({
    height: 0,
    width: 0,
  })

  useEffect(() => {
    const element = elementRef?.current
    if (!element) return

    const observer = new ResizeObserver(entries => {
      // callback(element, entries[0]);

      setInner({
        height: entries[0].contentRect.height,
        width: entries[0].contentRect.width,
      })
    })

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  return inner
}

export default useResizeObserver
