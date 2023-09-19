import { useEffect, useRef, useState } from 'react'
import { usePlayerStore, useWorldStore } from '../store'

const Play = 'play'
const Pause = 'pause'

const storeElapsedTime = (elapsedTime) => {
  useWorldStore.setState({ elapsedTime })
}

const initialElapsedTime = usePlayerStore.getState().initialElapsedTime
console.debug('[Timer] initialElapsedTime:', initialElapsedTime)
const Timer = () => {
  const status = useRef(Play)
  const [elapsedTime, setElapsedTime] = useState(initialElapsedTime)
  const [isCollectingChapter, isCollectingQuest] = usePlayerStore((state) => [
    state.isCollectingChapter,
    state.isCollectingQuest,
  ])

  const seconds = String(elapsedTime % 60).padStart(2, '0')
  const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '0')

  useEffect(() => {
    const interval = setInterval(() => {
      if (status.current === Pause) return
      setElapsedTime((elapsedTime) => {
        storeElapsedTime(elapsedTime)
        return elapsedTime + 1
      })
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
