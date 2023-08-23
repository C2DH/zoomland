import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

// light yellow
const Dawn = 0xffe6b3

const Lights = ({ color = Dawn }) => {
  const light = useRef()
  useFrame((state) => {
    light.current.position.z = state.camera.position.z
    light.current.position.x = state.camera.position.x + 40
    light.current.position.y = state.camera.position.y + 60
  })
  return (
    <>
      <directionalLight
        ref={light}
        intensity={1}
        castShadow
        color={color}
        // position={[40, 10, 25]}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={20}
        shadow-camera-far={150}
        shadow-camera-top={150}
        shadow-camera-right={150}
        shadow-camera-bottom={-150}
        shadow-camera-left={-150}
        shadow-bias={-0.01}
      />

      <ambientLight intensity={0.12} />
    </>
  )
}

export default Lights
