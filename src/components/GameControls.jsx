import { useSpring, a } from '@react-spring/web'
import { MenuClosed, useMenuStore } from '../store'
import './GameControls.css'
import { useEffect } from 'react'
import RoundButton from './RoundButton'
import CloseIcon from './Svg/CloseIcon'
import { isMobile } from 'react-device-detect'

const GameControls = () => {
  const [gameControlsStatus, setGameControlsStatus] = useMenuStore((state) => [
    state.gameControlsStatus,
    state.setGameControlsStatus,
  ])

  const [style, api] = useSpring(() => ({
    opacity: 0,
  }))

  const hide = () => {
    setGameControlsStatus(MenuClosed)
  }

  useEffect(() => {
    api.start({
      opacity: gameControlsStatus === MenuClosed ? 0 : 1,
      display: gameControlsStatus === MenuClosed ? 'none' : 'block',
    })
  }, [gameControlsStatus])

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
      <h2 className="mb-4">Game Controls</h2>
      {isMobile ? (
        <img
          src="/assets/svg/character-controls-mobile.svg"
          alt="Game controls"
          className="GameControls-img w-100"
        />
      ) : (
        <img
          src="/assets/svg/character-controls-desktop.svg"
          alt="Game controls"
          className="GameControls-img w-100"
        />
      )}
      <div className="background-pattern" style={{ width: '100vw', zIndex: '-1' }}></div>
    </a.div>
  )
}

export default GameControls