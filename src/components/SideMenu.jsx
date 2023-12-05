import { useEffect } from 'react'
import './SideMenu.css'
import './backgroundPattern.css'
import LogoGruyter from './Svg/LogoGruyter'
import LogoUni from './Svg/LogoUni'
import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import RoundButton from './RoundButton'
import CloseIcon from './Svg/CloseIcon'
import { a, useSpring } from '@react-spring/web'
import {
  MenuClosed,
  useMenuStore,
  MenuOpen,
  usePlayerStore,
  useWorldStore,
  SceneCredits,
  Gameplay,
} from '../store'
import IntroLogoZoomland from './IntroLogoZoomland'
import { isMobile } from 'react-device-detect'

const SideMenu = ({ debug = false }) => {
  const { pathname } = useLocation()
  const [menuStatus, set] = useMenuStore((state) => [state.menuStatus, state.setMenuStatus])
  const setGameControlsStatus = useMenuStore((state) => state.setGameControlsStatus)
  const saveInitialPropsToPlayerStore = useWorldStore(
    (state) => state.saveInitialPropsToPlayerStore,
  )
  const [setScene, newGame] = usePlayerStore((state) => [state.setScene, state.newGame])

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
        <div className="IntroLogoZoomland" style={{ marginTop: '0.6rem' }}>
          <IntroLogoZoomland
            width={isMobile ? 160 : 220}
            startAnimation={menuStatus === MenuOpen}
          />

          {/* <LogoZoomland color={'var(--pale-orange)'} /> */}
        </div>
        {/* <button className="btn btn-primary" onClick={saveInitialPropsToPlayerStore}>
            save
          </button>
          {children} */}
        <div className="menu-body">
          <Nav>
            {/* add space */}

            <Nav.Item>
              <button
                className="btn btn-link"
                onClick={() => {
                  setScene(Gameplay)
                  set(MenuClosed)
                }}
              >
                (Back to game)
              </button>
            </Nav.Item>

            {debug ? (
              <Nav.Item className={isMobile ? null : 'mb-3'}>
                <button className="btn btn-link" onClick={saveInitialPropsToPlayerStore}>
                  Save
                </button>
              </Nav.Item>
            ) : null}
            <div className="py-2"></div>
            <Nav.Item>
              <Link to="/map">Map</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/chapters">Chapters</Link>
            </Nav.Item>
            <div className="py-2"></div>
            <Nav.Item>
              <button
                className="btn btn-link"
                onClick={() => {
                  setGameControlsStatus(MenuClosed)
                  set(MenuClosed)
                }}
              >
                Game Controls
              </button>
            </Nav.Item>
            <Nav.Item>
              <Link to="/about">About</Link>
            </Nav.Item>
            <Nav.Item>
              <button
                className="btn btn-link"
                onClick={() => {
                  setScene(SceneCredits)
                  set(MenuClosed)
                }}
              >
                Credits
              </button>
            </Nav.Item>

            <div className="py-2"></div>
            <Nav.Item>
              <button
                className="btn btn-link"
                onClick={() => {
                  newGame()
                  set(MenuClosed)
                }}
              >
                New Game
              </button>
            </Nav.Item>
          </Nav>
        </div>
        <div className="menu-footer">
          <span className={isMobile ? null : 'mb-1'}>Legal notice</span>
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
