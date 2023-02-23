import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'

const CameraDolly = ({ isZoom }) => {
  const vec = new Vector3()

  useFrame((state) => {
    const step = 0.1
    const x = isZoom ? 0 : 3
    const y = isZoom ? 10 : 5
    const z = isZoom ? 10 : 5

    state.camera.position.lerp(vec.set(x, y, z), step)
    state.camera.lookAt(0, 0, 0)
    state.camera.updateProjectionMatrix()
  })

  return null
}

export default CameraDolly
