import { useRef, useEffect } from 'react'
import Lottie from 'react-lottie'
import { useQueueStore } from '../store/preload'
import animationData from '../assets/json/zoomland-logo.json'

const IntroLogoZoomland = ({ delay = 500, width, height, startAnimation = true, id }) => {
  const lottieRef = useRef()
  const timerRef = useRef()
  const isLoadingComplete = useQueueStore((state) => state.isLoadingComplete)

  useEffect(() => {
    clearTimeout(timerRef.current)
    console.debug(
      `[IntroLogoZoomland #${id}]`,
      '@useEffect \n - startAnimation',
      startAnimation,
      '\n - isLoadingComplete:',
      isLoadingComplete,
    )
    timerRef.current = setTimeout(() => {
      console.debug(`[IntroLogoZoomland #${id}]`, '@useEffect times up.')
      if (isLoadingComplete && startAnimation) {
        lottieRef.current.stop()
        lottieRef.current.play()
      }
    }, delay)
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [isLoadingComplete, startAnimation])

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return <Lottie width={width} height={height} options={defaultOptions} ref={lottieRef} />
}
export default IntroLogoZoomland
