import './RoundButton.css'

const RoundButton = ({
  Icon,
  backgroundColor = 'var(--dark-blue)',
  color = 'var(--pale-yellow)',
  onClick,
  className = '',
  text = '',
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`RoundButton ${className}`}
      disabled={disabled}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <>
        {text}
        {Icon ? <Icon color={color} /> : null}
      </>
    </button>
  )
}

export default RoundButton
