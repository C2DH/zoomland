import { useEffect, useRef, useState } from 'react'
import { SceneFakeBook, Start, usePlayerStore } from '../store'
import Book from './Book'
import './GlitchingBooks.css'
import Quest from './Quest'

const StatusIdle = 'idle'
const StatusGlitching = 'glitch'
const StatusDone = 'invisible'

const GlitchingBooks = ({ duration = 3000 }) => {
  const [scene, setScene] = usePlayerStore((state) => [state.scene, state.setScene])
  const timerRef = useRef(null)
  const [status, setStatus] = useState(StatusIdle)

  const onClickHandler = () => {
    setStatus(StatusGlitching)
    // setIsGlitching(true)
    // clearTimeout(timerRef.current)
    // timerRef.current = setTimeout(() => {
    //   setScene(Start)
    //   setIsVisible(false)
    // }, duration)
  }

  // useEffect(() => {
  //   return () => {
  //     clearTimeout(timerRef.current)
  //   }
  // }, [])

  useEffect(() => {
    if (scene === SceneFakeBook) {
      // start over!
      setStatus(StatusIdle)
    }
  }, [scene])

  if (scene !== SceneFakeBook) {
    return null
  }

  return (
    <div className="GlitchingBooks">
      {['-no', '', '-two'].map((className) => (
        <Book
          key={className}
          className={`${status === StatusGlitching ? 'Glitch' : ''}${className}`}
          onClick={onClickHandler}
        />
      ))}
      <div className="GlitchingBooks__bg"></div>
      <div className="GlitchingBooks__quest">
        {status === StatusGlitching && (
          <Quest
            initialDelay={duration}
            quest={{
              sentences: [
                'It broke, again.',
                'So... Can we actually trust the digital?',
                "I'll go for the Source.",
              ],
            }}
            onComplete={() => {
              setStatus(StatusDone)
              setScene(Start)
            }}
            onCompleteLabel="Let's get to Zoomland!"
          />
        )}
      </div>
    </div>
  )
}

export default GlitchingBooks
