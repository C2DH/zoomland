import React from 'react'
import './RoundButton.css'

const RoundButton = ({ Icon, Color, onClick }) => {
  const backgroundColorStyle = {
    backgroundColor: Color,
  }
  return (
    <button onClick={onClick} type="button" className="RoundButton" style={backgroundColorStyle}>
      <Icon />
    </button>
  )
}

export default RoundButton
