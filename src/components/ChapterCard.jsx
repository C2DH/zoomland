import { useRef, useState } from 'react'
import { a, useSpring } from '@react-spring/web'
import { useWindowStore } from '../store'
import BirdEyeView from './Svg/BirdEyeView'
import GroundView from './Svg/GroundView'
import OverheadView from './Svg/OverheadView'
import Author from './Author'
import LogoZoomland from './LogoZoomland'
import './ChapterCard.css'

const CardAspectRatio = 1060 / 720
const CardAspectRatioPercent = `${CardAspectRatio * 100}%`
const ColorCategory = {
  introduction: 'red',
  history: 'var(--history)',
  media: 'green',
  hermeneutics: 'red',
  ['digital landscapes']: 'black',
}

const ViewTypes = {
  birdEye: BirdEyeView,
  ground: GroundView,
  overhead: OverheadView,
}

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
  const ViewTypeComponent = ViewTypes[chapter.viewType] ? ViewTypes[chapter.viewType] : OverheadView
  const chapterNumber = Number(chapter.n).toString().padStart(2, '0')

  const clickHandler = () => {
    isFlipped.current = !isFlipped.current
    if (isFlipped.current === true) {
      const maxScale =
        Math.min(width / ref.current.offsetWidth, height / ref.current.offsetHeight) * 0.9
      animate.start({
        opacity: 1,
        // transform without scale
        // transform: `perspective(1000px) rotateY(${180}deg) `,
        transform: `perspective(1000px) rotateY(${180}deg) scale(${1}) `,
      })
    } else {
      animate.start({
        opacity: 0,
        // transform: `perspective(1000px) rotateY(0deg) `,
        transform: `perspective(1000px) rotateY(${0}deg) scale(${1}) `,
      })
    }
  }

  const onMouseEnterHandler = () => {
    if (isFlipped.current === true) {
      animate.start({
        transform: `perspective(1000px) rotateY(${180}deg) scale(${1.05}) `,
        opacity: 1,
      })
    } else {
      animate.start({
        opacity: 0,
        transform: `perspective(1000px) rotateY(${0}deg) scale(${1.05}) `,
      })
    }
  }

  const onMouseLeaveHandler = () => {
    if (isFlipped.current === true) {
      animate.start({
        transform: `perspective(1000px) rotateY(${180}deg) scale(${1}) `,
        opacity: 1,
      })
    } else {
      animate.start({
        opacity: 0,
        transform: `perspective(1000px) rotateY(${0}deg) scale(${1}) `,
      })
    }
  }

  return (
    <div
      ref={ref}
      className="ChapterCard"
      onClick={clickHandler}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      style={{ paddingBottom: CardAspectRatioPercent }}
    >
      <a.div
        className="ChapterCard_front"
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform,
          perspective: '600px',
        }}
      >
        {hasCover && (
          <img srcSet={chapter.card.srcset} alt={chapter.card.alt} className="ChapterCard_cover" />
        )}
        <div className="ChapterCard_category">{chapter.category}</div>
        <div className="ChapterCard_viewType">
          <ViewTypeComponent
            color={ColorCategory[chapter.category]}
            backgroundColor={'var(--pale-yellow)'}
            width={45}
          ></ViewTypeComponent>
        </div>
        <div className="ChapterCard_logo">
          <LogoZoomland size={100} color="var(--pale-yellow)"></LogoZoomland>
        </div>
        <div className="ChapterCard_chapterLabel">
          <div className="ChapterCard_number">#{chapterNumber}</div>
          {chapter.incipit}
        </div>
      </a.div>
      <a.div
        className="ChapterCard_back"
        style={{
          opacity,
          transform,
          rotateY: '180deg',
        }}
      >
        <div className="ChapterCard_outer h-100 w-100 d-flex flex-column justify-content-between p-4">
          <div className="ChapterCard_viewType">
            <ViewTypeComponent color={'rgba(32, 28, 60)'} width={35}></ViewTypeComponent>
          </div>
          <div className="ChapterCard_chapterLabel">
            Chapter <span className="ChapterCard_number">#{chapterNumber}</span>
          </div>
          <h2>{chapter.title}</h2>
          <div className="ChapterCard_authors">
            <h3>authors</h3>
            {chapter.authors.map((a, i) => {
              return (
                <div className="d-inline-block me-1" key={i}>
                  <Author className="d-inline" name={a} />
                  {i < chapter.authors.length - 1 && <span>,</span>}
                </div>
              )
            })}
          </div>
          <div className="ChapterCard_logo">
            <LogoZoomland color="var(--dark-blue)"></LogoZoomland>
          </div>
        </div>
      </a.div>
    </div>
  )
}
export default ChapterCard
