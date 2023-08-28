import { useEffect, useRef, useState } from 'react'

const useInView = props => {
  const { root } = props
  // local state
  const [isIntersecting, setIntersecting] = useState(false)

  // refs
  const targetRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        setIntersecting(entries[0].isIntersecting)

        // if (entries[0].isIntersecting) {
        //   console.log('Component is visible')
        //   // Perform actions when component is visible
        // }
      },
      {
        root,
        rootMargin: '0px',
      }
    )

    if (targetRef.current) {
      observer.observe(targetRef.current)
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current)
      }
    }
  }, [targetRef.current])

  return {
    targetRef,
    isIntersecting,
  }
}

export default useInView
