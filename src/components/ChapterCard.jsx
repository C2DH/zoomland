import { useRef, useState } from 'react'
import { a, useSpring } from '@react-spring/web'
import './ChapterCard.css'
import OverheadView from './Svg/OverheadView'
import { useWindowStore } from '../store'

const CardAspectRatio = 1.7777
import BirdEyeView from './Svg/BirdEyeView'
import GroundView from './Svg/GroundView'
const ChapterCard = ({ chapter }) => {
  const ref = useRef(null)
  const isFlipped = useRef(false)
  const [width, height] = useWindowStore((state) => [state.width, state.height])

  const [{ transform, opacity }, animate] = useSpring(() => ({
    opacity: 0,
    transform: `perspective(1000px) rotateY(0deg) scale(1)`,
    config: { mass: 5, tension: 500, friction: 80 },
    onStart: () => {
      if (isFlipped.current === true) {
        ref.current.style.zIndex = 100
      }
    },
    onRest: () => {
      if (isFlipped.current === false) {
        ref.current.style.zIndex = 0
      }
    },
  }))
  const hasCover = chapter.card?.srcset !== undefined
  const clickHandler = () => {
    // get ref box
    console.log(isFlipped.current, ref.current.getBoundingClientRect())
    // animate.start()
    isFlipped.current = !isFlipped.current
    if (isFlipped.current === true) {
      const maxScale =
        Math.min(width / ref.current.offsetWidth, height / ref.current.offsetHeight) * 0.9
      animate.start({
        opacity: 1,
        transform: `perspective(1000px) rotateY(${180}deg) scale(${maxScale}) `,
      })
    } else {
      animate.start({
        opacity: 0,
        transform: `perspective(1000px) rotateY(${0}deg) scale(${1}) `,
      })
    }
  }
  return (
    <div ref={ref} className="ChapterCard" onClick={clickHandler}>
      <a.div
        className="ChapterCard_front"
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform,
          perspective: '600px',
        }}
      >
        {chapter.title}
        {hasCover && (
          <img srcSet={chapter.card.srcset} alt={chapter.card.alt} className="ChapterCard_cover" />
        )}
        <OverheadView />
        <BirdEyeView />
        <GroundView />
      </a.div>
      <a.div
        className="ChapterCard_back"
        style={{
          opacity,
          transform,

          rotateX: '180deg',
        }}
      />
    </div>
  )
}
export default ChapterCard
