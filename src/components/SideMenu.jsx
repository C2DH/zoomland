import React, { useEffect } from 'react'
import './SideMenu.css'
import './backgroundPattern.css'
import LogoZoomland from './Svg/LogoZoomland'
import LogoGruyter from './Svg/LogoGruyter'
import LogoUni from './Svg/LogoUni'
import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import RoundButton from './RoundButton'
import CloseIcon from './Svg/CloseIcon'
import { a, config, useSpring } from '@react-spring/web'
import { MenuClosed, useMenuStore, MenuOpen } from '../store'

const SideMenu = () => {
  const { pathname } = useLocation()
  const [menuStatus, set] = useMenuStore((state) => [state.menuStatus, state.setMenuStatus])

  const [{ x }, api] = useSpring(() => ({
    x: menuStatus === MenuClosed ? 500 : 0,
  }))

  useEffect(() => {
    api.start({
      x: menuStatus === MenuClosed ? 500 : 0,
    })
  }, [menuStatus])

  useEffect(() => {
    console.info('SideMenu', pathname)
    set(MenuClosed)
  }, [pathname])

  const onClickHandler = () => {
    console.info('onClickHandler', menuStatus)
    set(menuStatus === MenuOpen ? MenuClosed : MenuOpen)
  }

  return (
    <div className="SideMenu">
      <a.div className="SideMenu_slide" style={{ x }}>
        <div style={{ marginRight: '0.7rem', position: 'absolute', right: 0 }}>
          <RoundButton Icon={CloseIcon} Color={'var(--dark-blue)'} onClick={onClickHandler} />
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
            {/* add space */}
            <Nav.Item className="mb-3">
              <Link to="/intro">introduction</Link>
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
      </a.div>
    </div>
  )
}

export default SideMenu
