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
        intensity={1}
        castShadow
        color={color}
        position={[0, 80, 80]}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={20}
        shadow-camera-far={100}
        shadow-camera-top={100}
        shadow-camera-right={100}
        shadow-camera-bottom={-100}
        shadow-camera-left={-100}
        shadow-bias={-0.01}
      />

      <ambientLight intensity={0.1} />
    </>
  )
}

export default Lights
