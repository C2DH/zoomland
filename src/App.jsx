import { Nav } from 'react-bootstrap'
import CollectedChapters from './components/CollectedChapters'
import Vignette from './components/Vignette'
import World from './components/World'
import { Link, Route, useLocation } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import About from './pages/About'
import Map from './pages/Map'

function App() {
  return (
    <>
      <CollectedChapters>
        <Nav>
          <Nav.Item className="me-2">
            <Link to="/">Play</Link>
          </Nav.Item>
          <Nav.Item className="me-2">
            <Link to="/about">About</Link>
          </Nav.Item>
          <Nav.Item className="me-2">
            <Link to="/map">map</Link>
          </Nav.Item>
        </Nav>
      </CollectedChapters>
      <Vignette></Vignette>
      <World width={window.innerWidth} height={window.innerHeight} />
      <AppRoutes>
        <Route path="/about" element={<About />} />
        <Route path="/map" element={<Map />} />
        <Route path="*" element={<>Hey</>} />
      </AppRoutes>
    </>
  )
}

export default App
