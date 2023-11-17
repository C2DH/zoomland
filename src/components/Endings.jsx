import { a, useSpring } from '@react-spring/web'
import { SceneCredits, SceneEnding, usePlayerStore } from '../store'
import { useEffect } from 'react'
import Quest from './Quest'

import './Endings.css'
import chapters from '../data/chapters'

const EndingsQuest = {
  sentences: [
    'Finally,I have got all the original chapters!',
    'I can safely return to my laptop, and read the full book.',
    'The real one. Thank you for playing!',
  ],
}

const Endings = () => {
  const [style, api] = useSpring(() => ({
    opacity: 1,
  }))

  const [scene, setScene] = usePlayerStore((state) => [state.scene, state.setScene])

  const onCompleteHandler = () => {
    console.debug('[SkipIntro] onIntroComplete')
    setScene(SceneCredits)
  }

  useEffect(() => {
    if (scene !== SceneEnding) {
      api.start({
        opacity: 0,
      })
    } else {
      api.start({
        opacity: 1,
      })
    }
  }, [scene])

  return (
    <a.div style={style} className={`Endings ${scene === SceneEnding ? 'active' : ''}`}>
      {scene === SceneEnding ? (
        <Quest
          initialDelay={100}
          quest={EndingsQuest}
          onComplete={onCompleteHandler}
          onCompleteLabel="see Credits"
          enablePrevious
        />
      ) : null}
    </a.div>
  )
}

export default Endings
