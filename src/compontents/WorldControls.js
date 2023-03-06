import { Joystick } from 'react-joystick-component'
const WorldControls = ({ handleMove, handleStop }) => {
  return (
    <Joystick
      size={100}
      sticky={true}
      baseColor="red"
      stickColor="blue"
      move={handleMove}
      stop={handleStop}
    ></Joystick>
  )
}

export default WorldControls
