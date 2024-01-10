import './JumpButton.css'
import { useSpring, a, config } from '@react-spring/web'

const JumpButton = ({ onClick, className = '' }) => {
  const [style, api] = useSpring(() => ({ scale: 0, config: config.gentle }))

  const handleClick = (e) => {
    api.start({
      scale: 2.5,
      config: config.gentle,
      onRest: () => api.start({ scale: 0, config: config.stiff }),
    })
    onClick(e)
  }

  const handleTouchEnd = () => {
    api.start({ scale: 0, config: config.stiff })
  }

  return (
    <button
      className={`JumpButton ${className}`}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      onTouchStart={handleClick}
      onKeyDown={() => {}}
      role="button"
    >
      <span>JUMP</span>
      <a.div style={style} className="JumpButton__flash" />
    </button>
  )
}

export default JumpButton
