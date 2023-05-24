import { Nav } from 'react-bootstrap'
import Header from './components/Header'
import Vignette from './components/Vignette'
import World from './components/World'
import { Link, Route, useLocation } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import About from './pages/About'
import React, { Suspense, useCallback, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useWindowStore } from './store'
import { debounce } from './utils/common'

const Map = React.lazy(() => import('./pages/Map'))
const Chapters = React.lazy(() => import('./pages/Chapters'))
const queryClient = new QueryClient()

function App() {
  const updateDimensions = useWindowStore((state) => state.updateDimensions)
  const change = () => {
    console.debug('[app] change')
    updateDimensions()
  }
  const debouncedHandleResize = useCallback(debounce(change, 1000), [])
  useEffect(() => {
    console.debug('[app] useEffect @resize')
    window.addEventListener('resize', debouncedHandleResize)
    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Header>
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
          <Nav.Item className="me-2">
            <Link to="/chapters">chapters</Link>
          </Nav.Item>
        </Nav>
      </Header>
      <Vignette></Vignette>
      <World width={window.innerWidth} height={window.innerHeight} />
      <AppRoutes>
        <Route path="/about" element={<About />} />
        <Route
          path="/map"
          element={
            <Suspense>
              <Map />
            </Suspense>
          }
        />
        <Route
          path="/chapters"
          element={
            <Suspense>
              <Chapters />
            </Suspense>
          }
        />
        <Route path="*" element={<>Hey</>} />
      </AppRoutes>
    </QueryClientProvider>
  )
}

export default App
