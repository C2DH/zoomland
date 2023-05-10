import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

// light yellow
const Dawn = 0xffe6b3

const Lights = ({ color = Dawn }) => {
  const light = useRef()
  useFrame((state) => {
    light.current.position.z = state.camera.position.z + 1
  })
  return (
    <>
      <directionalLight
        ref={light}
        intensity={1.5}
        castShadow
        color={color}
        position={[4, 4, 1]}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={0.5} />
    </>
  )
}

export default Lights
