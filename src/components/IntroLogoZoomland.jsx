import { useRef, useEffect } from 'react'
import Lottie from 'react-lottie'
import { useQueueStore } from '../store/preload'
import animationData from '../assets/json/zoomland-logo.json'
import { Gameplay, usePlayerStore } from '../store'
import { useSpring, a } from '@react-spring/web'

const IntroLogoZoomland = ({
  delay = 500,
  width,
  height,
  startAnimation = true,
  id,
  hideOnComplete = false,
}) => {
  const lottieRef = useRef()
  const timerRef = useRef()
  const [styles, api] = useSpring(() => ({
    opacity: 0,
  }))
  const isLoadingComplete = useQueueStore((state) => state.isLoadingComplete)
  const scene = usePlayerStore((state) => state.scene)

  useEffect(() => {
    clearTimeout(timerRef.current)
    console.debug(
      `[IntroLogoZoomland #${id}]`,
      '@useEffect \n - startAnimation',
      startAnimation,
      '\n - isLoadingComplete:',
      isLoadingComplete,
      '\n - scene:',
      scene,
    )
    if (!(isLoadingComplete && startAnimation && scene === Gameplay)) {
      return
    }
    api.set({
      opacity: 1,
    })
    timerRef.current = setTimeout(() => {
      console.debug(`[IntroLogoZoomland #${id}]`, '@useEffect times up.')
      lottieRef.current.anim.stop()
      lottieRef.current.anim.play()
      hideOnComplete &&
        api.start({
          opacity: 0,
          delay: 1000,
        })
    }, delay)
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [isLoadingComplete, startAnimation, scene, hideOnComplete])

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <a.div style={styles}>
      <Lottie width={width} height={height} options={defaultOptions} ref={lottieRef} />
    </a.div>
  )
}
export default IntroLogoZoomland
