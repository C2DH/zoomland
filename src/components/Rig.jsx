// import { CameraControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Vector3 } from 'three'
import { Gameplay, useMenuStore, usePlayerStore, useWorldStore } from '../store'

const Rig = () => {
  // function Rig({ position = new Vector3(0, 0, 2), focus = new Vector3(0, 0, 0) }) {
  // const { controls, scene } = useThree()
  const { pathname } = useLocation()
  const setCameraOffset = useWorldStore((state) => state.setCameraOffset)
  const scene = usePlayerStore((state) => state.scene)
  const menuStatus = useMenuStore((state) => state.menuStatus)
  const isObservingLandscape = usePlayerStore((state) => state.isObservingLandscape)
  useEffect(() => {
    let radius = 2.5
    let elevation = 1.5
    let followPlayer = scene === Gameplay
    if (isObservingLandscape) {
      radius = 5
      elevation = 3
    } else if (pathname === '/intro') {
      radius = 8
      elevation = 5
    } else if (pathname !== '/') {
      radius = 5
    } else if (menuStatus === 'open') {
      radius = 5
      elevation = 3
    }
    setCameraOffset({ radius, elevation, followPlayer })
  }, [scene, menuStatus, pathname, isObservingLandscape])
  // return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
  return null
}

export default Rig
