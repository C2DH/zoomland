import './Vignette.css' // Import CSS styles
import { animated, useSpring, to as interpolate, createInterpolator } from '@react-spring/web'

const interpolator = (v) => {
  return `radial-gradient(ellipse at center, rgba(0, 0, 0, 0) ${v}%, rgba(0, 0, 0, 0) ${v}%, rgba(0, 0, 0, 1) 95%, rgba(0, 0, 0, 1) 100%)`
}

const Vignette = ({ children, visible = true }) => {
  // if vignette should be visible
  const [props, api] = useSpring(() => ({
    qty: 100,
  }))

  const toggle = () => {
    console.debug('toggle vignette')
    api.start({
      qty: 50,
    })
  }

  return (
    <>
      <animated.div className="Vignette" style={{ background: props.qty.to(interpolator) }}>
        <button onClick={toggle}>show/hide vignette</button>
      </animated.div>

      {children}
    </>
  )
}

export default Vignette
