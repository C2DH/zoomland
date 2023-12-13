import { useEffect, useRef } from 'react'
import ReactNipple from 'react-nipple'
import { DefaultJoystick, useWorldStore } from '../store'
import JumpButton from './JumpButton'
import './Joystick.css'

const Joystick = () => {
  const setJoystick = useWorldStore((state) => state.setJoystick)
  const joystickProps = useRef(DefaultJoystick)
  const jumpingTimerRef = useRef()

  const update = () => {
    setJoystick(joystickProps.current)
    console.log('[Joystick] update:', joystickProps.current)
  }

  const handleMove = (e, data) => {
    if (!data.direction) return
    joystickProps.current = {
      moveForward: data.direction.y === 'up',
      moveBackward: data.direction.y === 'down',
      moveLeft: data.direction.x === 'left',
      moveRight: data.direction.x === 'right',
      sprint: data.distance > 50,
      jump: joystickProps.current.jump,
    }
    update()
  }

  const handleStop = () => {
    joystickProps.current = { ...DefaultJoystick, jump: joystickProps.current.jump }
    update()
  }

  const jump = () => {
    console.debug('[Joystick] @jump')
    joystickProps.current.jump = true
    update()
    clearTimeout(jumpingTimerRef.current)
    jumpingTimerRef.current = setTimeout(() => {
      joystickProps.current.jump = false
      update()
    }, 1000)
  }

  useEffect(() => {
    return () => {
      clearTimeout(jumpingTimerRef.current)
    }
  }, [])

  return (
    <div className="Joystick">
      <ReactNipple options={{ mode: 'dynamic' }} onMove={handleMove} onEnd={handleStop} />
      {/* <ReactJoystick size={size} sticky={false} move={handleMove} stop={handleStop} /> */}
      <JumpButton onClick={jump} />
    </div>
  )
}

export default Joystick
