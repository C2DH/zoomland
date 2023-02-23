import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { Vector3 } from 'three'
import CameraDolly from './CameraDolly'

// const JUMP = new Vector3(0, 1, 0)
const FORWARD = new Vector3(0, 0, -1)
const RIGHT = new Vector3(1, 0, 0)
const LEFT = new Vector3(-1, 0, 0)
const BACK = new Vector3(0, 0, 1)

const World = ({ width, height }) => {
  const [isZoom, setZoom] = useState(false)
  const [position, setPosition] = useState(new Vector3(0.5, 0.5, 0.5))
  // move the central box with the keyboard
  const onKeyDown = (e) => {
    console.debug('onKeyDown', e.key)
    const moveBy =
      e.key === 'ArrowUp'
        ? FORWARD
        : e.key === 'ArrowDown'
        ? BACK
        : e.key === 'ArrowLeft'
        ? LEFT
        : e.key === 'ArrowRight'
        ? RIGHT
        : null

    if (moveBy !== null) {
      e.preventDefault()
      setPosition((p) => {
        const pos = p.clone()
        pos.add(moveBy)
        return pos
      })
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <div className="World" style={{ width, height, margin: 'auto', border: '1px solid' }}>
      {JSON.stringify(position)}
      <Canvas>
        <OrthographicCamera makeDefault zoom={40} />
        <gridHelper args={[16, 16, 'blue', 'gray']} />
        <mesh onClick={() => setZoom(!isZoom)} position={position}>
          <boxGeometry attach="geometry" args={[1, 1, 1]} />
          <meshNormalMaterial attach="material" />
        </mesh>
        <CameraDolly isZoom={isZoom} />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default World
