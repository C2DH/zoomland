import './RoundButton.css'

const RoundButton = ({
  Icon,
  backgroundColor = 'var(--dark-blue)',
  color = 'var(--pale-yellow)',
  onClick,
  className = '',
  text = '',
  disabled = false,
  margin = '',
  active = false,
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`RoundButton ${className} ${active ? 'active' : ''}`}
      disabled={disabled}
      style={{
        backgroundColor: backgroundColor,
        margin: margin,
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
