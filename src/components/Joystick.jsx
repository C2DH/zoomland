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
    // const steeringSpeed = data.direction.x === 'left' ? -1 : 1
    const speedCoeff = 1 - Math.abs(Math.cos(data.angle.radian))

    const moveForwardOnly =
      data.direction.y === 'up' && data.angle.degree > 45 && data.angle.degree < 135
    const moveBackwardOnly =
      data.direction.y === 'down' && data.angle.degree > 225 && data.angle.degree < 315

    joystickProps.current = {
      moveForward: data.direction.y === 'up',
      moveBackward: data.direction.y === 'down',
      moveLeft: !moveForwardOnly && !moveBackwardOnly && data.direction.x === 'left',
      moveRight: !moveForwardOnly && !moveBackwardOnly && data.direction.x === 'right',
      sprint: data.force > 1,
      jump: joystickProps.current.jump,
      speedCoeff: data.direction.y === 'up' ? speedCoeff : speedCoeff * 0.5,
    }
    update()
  }

  const handleStop = () => {
    joystickProps.current = { ...DefaultJoystick, jump: joystickProps.current.jump, sprint: false }
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
    }, 300)
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
