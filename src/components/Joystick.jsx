import { Joystick as ReactJoystick } from 'react-joystick-component'
import './Joystick.css'
import { useWorldStore } from '../store'
import { useState } from 'react'

const Joystick = ({ size = 100 }) => {
  const setJoystick = useWorldStore((state) => state.setJoystick)

  // e = type: "move", x: 0.9098190482930891, y: 0.4150051799231635, direction: "RIGHT", distance: 100
  const handleMove = (e) => {
    // const theta = Math.atan2(e.y, e.x) - Math.PI / 2 // range (-PI, PI]
    // // calculate angle given x and Y position. Origin is the center
    // const steeringAngle = e.x === 0 ? 0 : e.x < 0 ? 1 - Math.cos(e.x) : Math.cos(e.x) - 1
    // const speed = e.y > 0 ? e.distance / 100 : -e.distance / 100
    // console.log('[Joystick]', e.x, speed)
    setJoystick(e.x, e.y)
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
