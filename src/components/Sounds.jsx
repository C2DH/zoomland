import useSound from 'use-sound'
import theme from '../../public/assets/sounds/theme.mp3'
import soundEffects from '../../public/assets/sounds/effects.mp3'
import { useEffect, useState } from 'react'
import './Sounds.css'
import { useAnimationStore, AnimationRun, AnimationJump, AnimationWalk } from '../store'

const SoundEffects = () => {
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
    console.debug('[SoundEffects] @useEffect', animation)
    stop()
    if ([AnimationWalk, AnimationJump, AnimationRun].includes(animation)) {
      console.debug('[SoundEffects] - play', animation)
      play({ id: animation })
    }
  }, [animation])

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
      <div className="Sounds position-fixed bottom-0 end-0">
        <button className="btn btn-primary" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? 'Stop' : 'Play'}
        </button>
      </div>
      <SoundTheme isPlaying={isPlaying} />
      <SoundEffects />
    </>
  )
}

export default Sounds
