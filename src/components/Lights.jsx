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
        intensity={0.8}
        castShadow
        color={color}
        // position={[40, 10, 25]}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={20}
        shadow-camera-far={150}
        shadow-camera-top={50}
        shadow-camera-right={50}
        shadow-camera-bottom={-50}
        shadow-camera-left={-50}
        shadow-bias={-0.01}
      />

      {/* <ambientLight intensity={0.08} /> */}
    </>
  )
}

export default Lights
