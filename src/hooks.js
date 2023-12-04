import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

const useSafeFrame = (callback) => {
  const isPageVisibleRef = useRef(!document.hidden)
  const lastHiddenTimeRef = useRef(null)

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        lastHiddenTimeRef.current = Date.now()
      }
      isPageVisibleRef.current = !document.hidden
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  useFrame((state, delta) => {
    if (!isPageVisibleRef.current) return

    if (lastHiddenTimeRef.current && Date.now() - lastHiddenTimeRef.current > 1000) {
      delta = 0
      lastHiddenTimeRef.current = null
    }

    callback(state, delta)
  })
}

export default useSafeFrame
