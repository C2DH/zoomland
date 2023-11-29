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
    }, 100)
  }

  const handleTouchEnd = () => {
    setClicked(false)

    setTimeout(() => {
      setClicked(true)
    }, 100)
  }

  return (
    <div
      className={`JumpButton ${isClicked ? 'clicked' : ''}`}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      {...props}
    >
      <span>JUMP</span>
    </div>
  )
}

export default JumpButton
