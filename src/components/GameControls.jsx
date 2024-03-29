import { useSpring, a } from '@react-spring/web'
import { Gameplay, usePersistentStore, usePlayerStore } from '../store'
import './GameControls.css'
import { useEffect, useRef } from 'react'
import RoundButton from './RoundButton'
import CloseIcon from './Svg/CloseIcon'
import { isMobile } from 'react-device-detect'

const GameControls = () => {
  const hasSeenGameControlsTimerRef = useRef(null)
  const isVisible = useRef(false)
  const scene = usePlayerStore((state) => state.scene)
  const [hasSeenGameControls, setHasSeenGameControls] = usePersistentStore((state) => [
    state.hasSeenGameControls,
    state.setHasSeenGameControls,
  ])

  const [style, api] = useSpring(() => ({
    opacity: 0,
    display: 'none',
    onRest: () => {
      if (!isVisible.current) {
        api.set({
          display: 'none',
        })
      }
    },
  }))

  useEffect(() => {
    console.debug('[GameControls] hasSeenGameControls:', hasSeenGameControls, ' scene: ', scene)
    if (scene === Gameplay && !hasSeenGameControls) {
      console.debug('[GameControls] show')

      hasSeenGameControlsTimerRef.current = setTimeout(() => show(), 5000)
    }
    return () => {
      clearTimeout(hasSeenGameControlsTimerRef.current)
    }
  }, [scene, hasSeenGameControls])

  const show = () => {
    console.debug('[GameControls] show!!!')
    isVisible.current = true
    api.start({
      opacity: 1,
      display: 'block',
    })
  }
  const hide = () => {
    isVisible.current = false
    api.start({
      opacity: 0,
    })
    setHasSeenGameControls(true)
  }

  return (
    <a.div style={style} className="GameControls">
      <div style={{ marginRight: '0.7rem', position: 'absolute', right: 0, top: '0.7rem' }}>
        <RoundButton
          Icon={CloseIcon}
          color={'var(--pale-yellow)'}
          backgroundColor={'var(--transparent)'}
          onClick={hide}
        />
      </div>
      <h2 className={isMobile ? 'mb-2' : 'mb-4'}>Game Controls</h2>
      {isMobile ? (
        <img
          src="assets/svg/character-controls-mobile.svg"
          alt="Game controls"
          className="GameControls-img w-100"
        />
      ) : (
        <img
          src="assets/svg/character-controls-desktop.svg"
          alt="Game controls"
          className="GameControls-img w-100"
        />
      )}
      <div className="background-pattern" style={{ width: '100vw', zIndex: '-1' }}></div>
    </a.div>
  )
}

export default GameControls
