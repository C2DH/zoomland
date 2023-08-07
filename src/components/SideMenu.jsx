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
import {
  MenuClosed,
  useMenuStore,
  MenuOpen,
  usePlayerStore,
  OpenSea,
  Gameplay,
  Start,
  useWorldStore,
} from '../store'

const SideMenu = () => {
  const { pathname } = useLocation()
  const [menuStatus, set] = useMenuStore((state) => [state.menuStatus, state.setMenuStatus])
  const saveInitialPropsToPlayerStore = useWorldStore(
    (state) => state.saveInitialPropsToPlayerStore,
  )
  const [setScene] = usePlayerStore((state) => [state.setScene])

  const [{ x }, api] = useSpring(() => ({
    x: menuStatus === MenuClosed ? 800 : 0,
  }))

  useEffect(() => {
    api.start({
      x: menuStatus === MenuClosed ? 800 : 0,
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
          <RoundButton
            Icon={CloseIcon}
            color={'var(--pale-yellow)'}
            backgroundColor={'var(--transparent)'}
            onClick={onClickHandler}
          />
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
              <button
                className="btn btn-link"
                onClick={() => {
                  setScene(Gameplay)
                  set(MenuClosed)
                }}
              >
                New Game
              </button>
            </Nav.Item>

            {/* add space */}
            <Nav.Item>
              <button
                className="btn btn-link"
                onClick={() => {
                  setScene(Start)
                  set(MenuClosed)
                }}
              >
                introduction
              </button>
            </Nav.Item>
            <Nav.Item className="mb-3">
              <button className="btn btn-link" onClick={saveInitialPropsToPlayerStore}>
                save
              </button>
            </Nav.Item>
            <Nav.Item>
              <Link to="/map">Map</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/chapters">Chapters</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/game_controls">Game Controls</Link>
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
        <div className="background-pattern" style={{ width: '100vw', zIndex: '-1' }}></div>
      </a.div>
    </div>
  )
}

export default SideMenu
