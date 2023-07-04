// import { CameraControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Vector3 } from 'three'
import { useMenuStore, useWorldStore } from '../store'

const Rig = () => {
  // function Rig({ position = new Vector3(0, 0, 2), focus = new Vector3(0, 0, 0) }) {
  // const { controls, scene } = useThree()
  const { pathname } = useLocation()
  const setCameraOffset = useWorldStore((state) => state.setCameraOffset)
  const menuStatus = useMenuStore((state) => state.menuStatus)

  useEffect(() => {
    let radius = 2.5
    let elevation = 1.5
    if (pathname === '/intro') {
      radius = 8
      elevation = 5
    } else if (pathname !== '/') {
      radius = 5
    } else if (menuStatus === 'open') {
      radius = 5
      elevation = 3
    }
    setCameraOffset({ radius, elevation })
  }, [menuStatus, pathname])
  // return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
  return null
}

export default Rig
