import React from 'react'
import './RoundButton.css'

const RoundButton = ({
  Icon,
  backgroundColor = 'var(--dark-blue)',
  color = 'var(--pale-yellow)',
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`RoundButton ${className}`}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <Icon color={color} />
    </button>
  )
}

export default RoundButton
