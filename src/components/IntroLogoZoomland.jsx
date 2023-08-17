import React, { useRef, useEffect } from 'react'
import { MenuClosed, MenuOpen, useMenuStore } from '../store'

import Lottie from 'react-lottie'

const res = await fetch('./assets/json/zoomland-logo.json')
const animationData = await res.json()

const IntroLogoZoomland = ({ delay = 1000, width, startAnimation = true }) => {
  const lottieRef = useRef()
  const timerRef = useRef()

  useEffect(() => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (startAnimation) {
        lottieRef.current.stop()
        lottieRef.current.play()
      }
    }, delay)
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [startAnimation])

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return <Lottie width={width} options={defaultOptions} ref={lottieRef} />
}
export default IntroLogoZoomland
