import { Gameplay, OpenSea, Start, usePlayerStore } from '../store'
import { useEffect } from 'react'
import { useSpring, useSprings, a } from '@react-spring/web'
import Quest from './Quest'
import './SkipIntro.css'

const IntroQuest = {
  sentences: [
    'Finally, the island is in sight!',
    'I can see the harbour in the distance.',
    "Let's finish this, once and for all.",
  ],
}

const SkipIntro = () => {
  const [scene, setScene] = usePlayerStore((state) => [state.scene, state.setScene])
  const [style, api] = useSpring(() => ({
    opacity: 1,
  }))

  const onIntroQuestComplete = () => {
    console.debug('[SkipIntro] onIntroComplete')
    setScene(OpenSea)
  }

  useEffect(() => {
    if (scene !== OpenSea && scene !== Start) {
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
    <a.div style={style} className="SkipIntro">
      {scene === Start ? (
        <Quest
          quest={IntroQuest}
          onComplete={onIntroQuestComplete}
          onCompleteLabel="Let's get to the harbour!"
        />
      ) : (
        <button
          className="btn btn-block btn-primary btn-lg"
          onClick={() => setScene(scene === Start ? OpenSea : Gameplay)}
        >
          {scene === Start && <span>Let's get to the harbour!</span>}
          {scene === OpenSea && <span>Let's get to the island!</span>}
          {scene}
        </button>
      )}
    </a.div>
  )
}

export default SkipIntro
