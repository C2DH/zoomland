import { Joystick as ReactJoystick } from 'react-joystick-component'
import './Joystick.css'
import { useWorldStore } from '../store'
import JumpButton from './JumpButton'

const IS_JUMPING = true
const IS_NOT_JUMPING = false
const Joystick = ({ size = 80 }) => {
  const setJoystick = useWorldStore((state) => state.setJoystick)

  // e = type: "move", x: 0.9098190482930891, y: 0.4150051799231635, direction: "RIGHT", distance: 100
  const handleMove = (e) => {
    const theta = Math.atan2(e.y, e.x) - Math.PI / 2 // range (-PI, PI]
    // calculate angle given x and Y position. Origin is the center
    const steeringAngle = e.x === 0 ? 0 : e.x < 0 ? 1 - Math.cos(e.x) : Math.cos(e.x) - 1
    const speedX = e.x > 0 ? e.distance / 35 : -e.distance / 35
    const speedY = e.y > 0 ? e.distance / 100 : -e.distance / 100
    console.log('[Joystick]', speedY, e.distance)
    if (speedY > 0) {
      setJoystick(-steeringAngle * 4, e.distance / 100, IS_NOT_JUMPING)
    }
  }
  const handleStop = () => {
    setJoystick(undefined, 0, IS_NOT_JUMPING)
  }

  const jump = () => {
    console.debug('[Joystick] @jump')
    setJoystick(undefined, 0, IS_NOT_JUMPING)
  }
  return (
    <div className="Joystick">
      <ReactJoystick size={size} sticky={false} move={handleMove} stop={handleStop} />
      <JumpButton onClick={jump} />
    </div>
  )
}

export default Joystick
