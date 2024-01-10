import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import RoundButton from './RoundButton'
import MapIcon from './Svg/MapIcon'

const MapButton = () => {
  const [active, setIsActive] = useState(true)
  const { pathname } = useLocation()

  return (
    <div className="MapButton fill">
      <Link to={pathname === '/' ? '/map' : '/'}>
        <RoundButton
          active={active}
          onClick={() => setIsActive(false)}
          Icon={MapIcon}
        ></RoundButton>
      </Link>
    </div>
  )
}

export default MapButton
