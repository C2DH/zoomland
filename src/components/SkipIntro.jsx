import { Gameplay, OpenSea, Start, usePlayerStore } from '../store'
import { useQueueStore } from '../store/preload'
import { useEffect } from 'react'
import { useSpring, a } from '@react-spring/web'
import Quest from './Quest'
import './SkipIntro.css'
import RoundButton from './RoundButton'

const IntroQuest = {
  sentences: [
    'Finally, the island is in sight!',
    'I can see its harbour in the distance.',
    'The Book is well-protected here. I should have a word with its inhabitants.',
  ],
}

const SkipIntro = () => {
  const [scene, setScene] = usePlayerStore((state) => [state.scene, state.setScene])
  const isLoadingComplete = useQueueStore((state) => state.isLoadingComplete)
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

  useEffect(() => {
    console.debug('[SkipIntro] isLoadingComplete', isLoadingComplete)
  }, [scene, isLoadingComplete])

  return (
    <a.div style={style} className="SkipIntro">
      {scene === Start && isLoadingComplete && (
        <Quest
          initialDelay={100}
          quest={IntroQuest}
          onComplete={onIntroQuestComplete}
          onCompleteLabel="Let's get to the harbour!"
        />
      )}
    </a.div>
  )
}

export default SkipIntro
