import useSound from 'use-sound'
import theme from '../../public/assets/sounds/theme.mp3'
import soundEffects from '../../public/assets/sounds/effects.mp3'
import { useEffect, useState } from 'react'
import './Sounds.css'
import { useAnimationStore, AnimationRun, AnimationJump, AnimationWalk } from '../store'
import RoundButton from './RoundButton'
import SpeakersOff from './Svg/SpeakersOff'
import SpeakersOn from './Svg/SpeakersOn'

const SoundEffects = ({ isPlaying }) => {
  const animation = useAnimationStore((state) => state.animation)
  const [play, { stop }] = useSound(soundEffects, {
    sprite: {
      [AnimationWalk]: [1500, 1900],
      [AnimationJump]: [3500, 400],
      // [AnimationWalk]: [666, 290],
      [AnimationRun]: [0, 1360],
    },
    loop: true,
    volume: 0.15,
  })

  useEffect(() => {
    console.debug(
      '[SoundEffects] @useEffect \n - animation:',
      animation,
      '\n - isPlaying:',
      isPlaying,
    )
    stop()
    if (isPlaying && [AnimationWalk, AnimationJump, AnimationRun].includes(animation)) {
      console.debug('[SoundEffects] - play', animation)
      play({ id: animation })
    }
  }, [animation, isPlaying])

  return null
}

const SoundTheme = ({ isPlaying }) => {
  const [play, api] = useSound(theme, {
    loop: true,
    volume: 0.35,
  })

  useEffect(() => {
    api.stop()
    if (isPlaying) {
      play()
    }
  }, [isPlaying])
  console.debug('[Sounds] isPlaying', isPlaying, api)
  return null
}

const Sounds = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  useEffect(() => {
    setIsPlaying(false)
  }, [])
  return (
    <>
      <div
        className="Sounds fill position-fixed bottom-0 end-0"
        style={{ margin: '2rem', zIndex: '2' }}
      >
        <RoundButton
          onClick={() => setIsPlaying(!isPlaying)}
          Icon={isPlaying ? SpeakersOn : SpeakersOff}
        ></RoundButton>
      </div>

      <SoundTheme isPlaying={isPlaying} />
      <SoundEffects isPlaying={isPlaying} />
    </>
  )
}

export default Sounds
