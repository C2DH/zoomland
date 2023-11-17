import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Gameplay,
  SceneCredits,
  useMenuStore,
  usePlayerStore,
  SceneFakeBook,
  useWorldStore,
  Start,
  SceneEnding,
} from '../store'

const Rig = () => {
  // function Rig({ position = new Vector3(0, 0, 2), focus = new Vector3(0, 0, 0) }) {
  // const { controls, scene } = useThree()
  const { pathname } = useLocation()
  const setCameraOffset = useWorldStore((state) => state.setCameraOffset)
  const scene = usePlayerStore((state) => state.scene)
  const menuStatus = useMenuStore((state) => state.menuStatus)
  const [isCollectingQuest, isObservingLandscape] = usePlayerStore((state) => [
    state.isCollectingQuest,
    state.isObservingLandscape,
  ])
  useEffect(() => {
    let radius = 2.5
    let elevation = 1.5
    let followPlayer = scene === Gameplay || scene === SceneCredits
    if (isCollectingQuest) {
      radius = 1.3
      elevation = 1.8
    } else if (isObservingLandscape) {
      radius = 5
      elevation = 3
    } else if (scene === Start) {
      radius = 4
      elevation = 2
    } else if (scene === SceneFakeBook) {
      elevation = 1.5
      radius = 1.8
    } else if (pathname === '/intro') {
      radius = 8
      elevation = 5
    } else if (pathname !== '/') {
      radius = 5
    } else if (menuStatus === 'open') {
      radius = 5
      elevation = 3
    } else if (scene === SceneCredits || scene === SceneEnding) {
      radius = 8
      elevation = 5
      followPlayer = true
    }
    console.info('[Rig] setCameraOffset', radius, elevation, followPlayer)
    setCameraOffset({ radius, elevation, followPlayer })
  }, [scene, menuStatus, pathname, isCollectingQuest, isObservingLandscape])
  return null
}

export default Rig
