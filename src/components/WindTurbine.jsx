import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const WindTurbine = (props) => {
  const turbineRotation = useRef()
  const { nodes, materials } = useGLTF('assets/models/WindTurbine.glb')

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()

    // Update rotation
    turbineRotation.current.rotation.x = elapsedTime / props.rotationSpeed
  })

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pillar.geometry}
        material={materials.Turbine}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Turbine.geometry}
        material={materials.Turbine}
        ref={turbineRotation}
        position={[0, 38.7, 0]}
      />
    </group>
  )
}

useGLTF.preload('assets/models/WindTurbine.glb')
export default WindTurbine
