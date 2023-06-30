import React from 'react'
import { isMenuVisibleStore } from '../store'
import './Header.css'
import LogoZoomland from './Svg/LogoZoomland'
import Counter from './Counter'
import MenuIcon from './Svg/MenuIcon'
import RoundButton from './RoundButton'
import { useWorldStore } from '../store'
import LogoZoomlandSmall from './Svg/LogoZoomlandSmall'

const Header = ({ isMobile = true }) => {
  const { isMenuVisible, toggleMenu } = isMenuVisibleStore()
  // const saveInitialPropsToPlayerStore = useWorldStore(
  //   (state) => state.saveInitialPropsToPlayerStore,
  // )
  const isMobileStyle = {
    top: isMobile ? '1rem' : '2rem',
    margin: isMobile ? '0 1rem' : '0 2rem',
    width: isMobile ? 'calc(100% - 2rem)' : 'calc(100% - 4rem)',
    justifyContent: isMobile ? 'flex-start' : 'center',
  }

  const logoPosition = {
    position: 'absolute',
    left: '0',
  }
  console.log('Toggle', isMenuVisible)
  return (
    <div className="Header" style={isMobileStyle}>
      {isMobile ? null : (
        <div style={logoPosition}>
          <LogoZoomland />
        </div>
      )}
      {/* <button className="btn btn-primary" onClick={saveInitialPropsToPlayerStore}>
            save
          </button>
          {children} */}
      <Counter />
      <RoundButton Icon={MenuIcon} onClick={toggleMenu} />
    </div>
  )
}

export default Header
