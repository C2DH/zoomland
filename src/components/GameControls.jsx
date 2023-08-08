import { useSpring, a } from '@react-spring/web'
import { MenuClosed, useMenuStore } from '../store'
import './GameControls.css'
import { useEffect } from 'react'

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
    })
  }, [gameControlsStatus])

  return (
    <a.div style={style} className="GameControls p-5">
      GameControls
      <button className="btn btn-link btn-lg" onClick={hide}>
        Got it!
      </button>
    </a.div>
  )
}

export default GameControls
