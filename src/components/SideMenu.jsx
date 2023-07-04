import React from 'react'
import './SideMenu.css'
import './backgroundPattern.css'
import LogoZoomland from './Svg/LogoZoomland'
import LogoGruyter from './Svg/LogoGruyter'
import LogoUni from './Svg/LogoUni'
import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import RoundButton from './RoundButton'
import CloseIcon from './Svg/CloseIcon'
// import { a, useSpring } from 'react-spring'
import { MenuClosed, useMenuStore, MenuOpen } from '../store'

import { useLayoutEffect } from 'react'

const SideMenu = () => {
  const { pathname } = useLocation()
  const menuStatus = useMenuStore((state) => state.menuStatus)
  const setMenuStatus = useMenuStore((state) => state.setMenuStatus)
  // const saveInitialPropsToPlayerStore = useWorldStore(
  //   (state) => state.saveInitialPropsToPlayerStore,
  // )
  // const closeButtonStyle = {
  //   backgroundcolor: var(--rose);
  // }
  // useLayoutEffect(() => {
  //   if (menuStatus === MenuOpen) {
  //     setMenuStatus(MenuClosed)
  //   }
  // }, [pathname])

  //MENU ANIMATION
  // const [api] = useSpring(() => ({
  //   x: availableWidth,
  // }))

  // useEffect(() => {
  //   api.start({
  //     x: menuStatus === MenuClosed ? -500 : 0,
  //   })
  // }, [menuStatus, api])

  console.log('PATH', pathname)

  const menuClickEvent = () => {
    if (menuStatus === MenuOpen) {
      setMenuStatus(MenuClosed)
    }
  }

  return (
    <div className="SideMenu">
      <div style={{ marginRight: '0.7rem', position: 'absolute', right: 0 }}>
        <RoundButton Icon={CloseIcon} Color={'var(--dark-blue)'} onClick={menuClickEvent} />
      </div>
      <div style={{ marginTop: '0.6rem' }}>
        <LogoZoomland />
      </div>
      {/* <button className="btn btn-primary" onClick={saveInitialPropsToPlayerStore}>
            save
          </button>
          {children} */}
      <div className="menu-body">
        <Nav>
          <Nav.Item>
            <Link to="/">New Game</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/map">Map</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/chapters">Chapters</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/about">About</Link>
          </Nav.Item>
        </Nav>
      </div>
      <div className="menu-footer">
        <span>Legal notice</span>
        <div className="footer-logos">
          <LogoUni />
          <LogoGruyter />
        </div>
      </div>
      <div className="background-pattern" style={{ width: '320px', zIndex: '-1' }}></div>
    </div>
  )
}

export default SideMenu
