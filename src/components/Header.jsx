import React from 'react'
import './Header.css'
import LogoZoomland from './Svg/LogoZoomland'
import Counter from './Counter'
import MenuIcon from './Svg/MenuIcon'
import RoundButton from './RoundButton'
import { MenuOpen, useMenuStore } from '../store'

const Header = ({ isMobile = true }) => {
  const menuStatus = useMenuStore((state) => state.menuStatus)
  const setMenuStatus = useMenuStore((state) => state.setMenuStatus)

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

  const menuClickEvent = () => {
    setMenuStatus(MenuOpen)
  }

  console.log('Toggle', menuStatus)
  return (
    <div className="Header" style={isMobileStyle}>
      {isMobile ? null : (
        <div style={logoPosition}>
          <LogoZoomland />
        </div>
      )}

      <Counter />
      <div style={{ position: 'absolute', right: 0 }}>
        <RoundButton Icon={MenuIcon} onClick={menuClickEvent} />
      </div>
    </div>
  )
}

export default Header
