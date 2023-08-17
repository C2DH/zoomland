// import LogoZoomland from './Svg/LogoZoomland'
import React, { useRef, useEffect } from 'react'
import { MenuClosed, MenuOpen, useMenuStore } from '../store'

import Lottie from 'react-lottie'

const res = await fetch('./assets/json/zoomland-logo.json')
const animationData = await res.json()
const IntroLogoZoomland = ({ timeOut, width, speed = 0.1 }) => {
  const lottieRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      lottieRef.current.play()

      console.log(speed, 'complete')
    }, timeOut)
  }, [])

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: JSON.parse(JSON.stringify(animationData)),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      viewBoxOnly: true,
    },
  }

  return (
    <Lottie
      width={width}
      options={defaultOptions}
      speed={speed}
      ref={lottieRef}
      style={{ transformOrigin: 'left' }}
    />
  )
}
export default IntroLogoZoomland
