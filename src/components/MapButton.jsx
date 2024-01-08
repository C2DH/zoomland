import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import RoundButton from './RoundButton'
import MapIcon from './Svg/MapIcon'

const MapButton = ({ isMobile = false }) => {
  const [active, setIsActive] = useState(true)
  const { pathname } = useLocation()

  return (
    <div className="mapButton fill position-fixed bottom-0">
      <Link to={pathname === '/' ? '/map' : '/'}>
        <RoundButton
          active={active}
          onClick={() => setIsActive(false)}
          Icon={MapIcon}
          margin={isMobile ? '1rem' : '2rem'}
        ></RoundButton>
      </Link>
    </div>
  )
}

export default MapButton
