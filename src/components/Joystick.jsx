import { Joystick as ReactJoystick } from 'react-joystick-component'
import './Joystick.css'
import { useWorldStore } from '../store'
import { useState } from 'react'

const Joystick = ({ size = 100 }) => {
  const setJoystick = useWorldStore((state) => state.setJoystick)

  // e = type: "move", x: 0.9098190482930891, y: 0.4150051799231635, direction: "RIGHT", distance: 100
  const handleMove = (e) => {
    // calculate angle given x and Y position. Origin is the center
    const angle = Math.atan2(e.y, e.x)
    console.log('[Joystick]', angle, e.distance)
    setJoystick(angle, e.distance / 100)
  }
  const handleStop = (e, data) => {
    setJoystick(undefined, 0)
  }
  return (
    <div className="Joystick">
      <ReactJoystick
        size={size}
        sticky={false}
        baseColor="red"
        stickColor="blue"
        move={handleMove}
        stop={handleStop}
      />
    </div>
  )
}

export default Joystick
