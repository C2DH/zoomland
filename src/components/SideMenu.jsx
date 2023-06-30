import React from 'react'
import './SideMenu.css'
import './backgroundPattern.css'
import LogoZoomland from './Svg/LogoZoomland'
import LogoGruyter from './Svg/LogoGruyter'
import LogoUni from './Svg/LogoUni'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import RoundButton from './RoundButton'
import CloseIcon from './Svg/CloseIcon'

const SideMenu = ({ isMobile, children }) => {
  // const saveInitialPropsToPlayerStore = useWorldStore(
  //   (state) => state.saveInitialPropsToPlayerStore,
  // )
  // const closeButtonStyle = {
  //   backgroundcolor: var(--rose);
  // }
  return (
    <div className="SideMenu">
      <div style={{ marginRight: '0.7rem', position: 'absolute', right: 0 }}>
        <RoundButton Icon={CloseIcon} Color={'var(--dark-blue)'} />
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
