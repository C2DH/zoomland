import React from 'react'
import './RoundButton.css'

const RoundButton = ({ Icon, color = 'red', onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`RoundButton ${className}`}
      style={{
        backgroundColor: color,
      }}
    >
      <Icon />
    </button>
  )
}

export default RoundButton
