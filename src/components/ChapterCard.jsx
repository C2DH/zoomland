import { useState } from 'react'
import { a, useSpring } from '@react-spring/web'
import './ChapterCard.css'
import OverheadView from './Svg/OverheadView'
const ChapterCard = ({ chapter }) => {
  const [flipped, set] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })
  return (
    <div className="ChapterCard" onClick={() => set((state) => !state)}>
      <a.div
        className="ChapterCard_front"
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform,
        }}
      >
        {chapter.title}
        <OverheadView />
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
