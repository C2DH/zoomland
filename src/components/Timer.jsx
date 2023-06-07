import { useEffect, useRef, useState } from 'react'
import { usePlayerStore } from '../store'

const Play = 'play'
const Pause = 'pause'

const Timer = ({ maxElapsedTime = 60 * 10 }) => {
  const status = useRef(Play)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isCollectingChapter, isCollectingQuest] = usePlayerStore((state) => [
    state.isCollectingChapter,
    state.isCollectingQuest,
  ])
  const seconds = String(elapsedTime % 60).padStart(2, '0')
  const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '0')

  useEffect(() => {
    const interval = setInterval(() => {
      if (status.current === Pause) return
      setElapsedTime((elapsedTime) => elapsedTime + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isCollectingChapter || isCollectingQuest) {
      status.current = Pause
    } else {
      status.current = Play
    }
  }, [isCollectingChapter, isCollectingQuest])
  return minutes + ':' + seconds
}

export default Timer
