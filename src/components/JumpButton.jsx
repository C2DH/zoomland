import React, { useState } from 'react'
import './JumpButton.css'

const JumpButton = ({ onClick, ...props }) => {
  const [isClicked, setClicked] = useState(false)

  const handleClick = () => {
    // Update the state to toggle the click effect
    setClicked(true)

    // Reset the click effect after a short delay
    setTimeout(() => {
      setClicked(false)
    }, 300)
  }

  return (
    <div className={`JumpButton ${isClicked ? 'clicked' : ''}`} onClick={handleClick} {...props}>
      <span>JUMP</span>
    </div>
  )
}

export default JumpButton
