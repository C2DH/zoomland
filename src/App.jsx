import { useCallback, useEffect } from 'react'
import Header from './components/Header'
import Vignette from './components/Vignette'
import World from './components/World'
import { Route } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import About from './pages/About'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useWindowStore } from './store'
import { debounce } from './utils/common'
import { isMobile } from 'react-device-detect'
import SideMenu from './components/SideMenu'
import IntroLogoZoomland from './components/IntroLogoZoomland'
import SkipIntro from './components/SkipIntro'
import GameControls from './components/GameControls'
import Credits from './components/Credits'
import GlitchingBooks from './components/GlitchingBooks'
import Endings from './components/Endings'
import { Gameplay, usePlayerStore } from './store/index.js'
import { MenuClosed, MenuOpen, useMenuStore } from './store'
import ChaptersPage from './pages/Chapters'
import MapPage from './pages/Map'
import MapButton from './components/MapButton.jsx'

const queryClient = new QueryClient()

function App() {
  const setGameControlsStatus = useMenuStore((state) => state.setGameControlsStatus)
  const scene = usePlayerStore.getState().scene

  useEffect(() => {
    setGameControlsStatus(MenuOpen)
    if (scene === Gameplay) {
      const timeoutId = setTimeout(() => {
        setGameControlsStatus(MenuClosed)
      }, 10000)

      // Cleanup the timeout to avoid memory leaks
      return () => clearTimeout(timeoutId)
    }
  }, []) // Empty dependency array ensures that this effect runs only

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
  console.debug('[app] render')
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className="Lottie-animation"
        style={{
          zIndex: '7',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: isMobile ? '70vw' : '50vw',
          marginLeft: isMobile ? '15vw' : '25vw',
          position: 'relative',
        }}
      >
        <IntroLogoZoomland delay={2500} id="introLogoZoomland" hideOnComplete />
      </div>
      <GlitchingBooks />
      <MapButton />
      <SideMenu />
      <Header isMobile={isMobile}></Header>
      <Credits />
      <Vignette></Vignette>
      <SkipIntro />
      <Endings />
      {!isMobile ? <GameControls /> : null}
      <World isMobile={isMobile} width={window.innerWidth} height={window.innerHeight} />
      <AppRoutes>
        <Route path="/about" element={<About />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/chapters" element={<ChaptersPage />} />
        <Route path="*" element={<></>} />
      </AppRoutes>
    </QueryClientProvider>
  )
}

export default App
