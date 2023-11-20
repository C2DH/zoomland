import { useEffect, useRef } from 'react'
import { usePlayerStore, NumberOfChapters } from '../store'
import Timer from './Timer'
import './Counter.css'
import { Link } from 'react-router-dom'

import animationData from '../assets/json/awesome-stars.json'
import Lottie from 'react-lottie'

export const Counter = () => {
  const lottieRef = useRef(null)

  const [progress, collectedChapters, isCollectingChapter] = usePlayerStore((state) => [
    state.progress,
    state.collectedChapters,
    state.isCollectingChapter,
  ])

  useEffect(() => {
    console.debug('[Counter] isCollectingChapter', isCollectingChapter)
    // start Lottie animation
    if (isCollectingChapter && lottieRef.current) {
      console.debug('[Counter] start Lottie animation')
      lottieRef.current.stop()
      lottieRef.current.play()
    } else if (lottieRef.current) {
      console.debug('[Counter] stop Lottie animation')
      lottieRef.current.stop()
    }
  }, [isCollectingChapter])

  const HumanreadableProgress = Math.round(progress * 100)
  return (
    <div className="Counter">
      <div className="Counter_blocks">
        <div className="Counter_col align-items-start">
          <span>Goal</span>
          {HumanreadableProgress} %
        </div>
        <div className="Counter_col align-items-center">
          <Link to="/chapters">Chapters</Link>
          <span>
            {collectedChapters.length} / {NumberOfChapters}
          </span>
        </div>
        <div className="Counter_col">
          <span>Elapsed</span>
          <div className="Timer">
            <Timer />
          </div>
        </div>
      </div>
      <div className="Counter_stars">
        <Lottie
          width={200}
          options={{
            loop: false,
            autoplay: false,
            speed: 20,
            animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
          ref={lottieRef}
          style={{ opacity: '1' }}
        />
      </div>
    </div>
  )
}

export default Counter
