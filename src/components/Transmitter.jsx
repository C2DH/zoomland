import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const Transmitter = (props) => {
  const transmitterRotation = useRef()
  const { nodes, materials } = useGLTF('../assets/models/Transmitter.glb')

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()

    // Update rotation
    transmitterRotation.current.rotation.y = elapsedTime / 2
  })

  return (
    <group {...props} dispose={null} ref={transmitterRotation}>
      <mesh castShadow receiveShadow geometry={nodes.Cube001.geometry} material={materials.Tower} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001_1.geometry}
        material={materials.TowerRed}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/Transmitter.glb')
export default Transmitter
