import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const Banjo = (props) => {
  const banjoRef = useRef()
  const { nodes, materials } = useGLTF('../assets/models/Banjo.glb')
  const seed = 0.8
  // Animate the tree
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const positionFactor = Math.sin(time * seed) * 0.1
    banjoRef.current.position.y = 11.9 + positionFactor
    banjoRef.current.rotation.y += 0.005
  })
  return (
    <group {...props} dispose={null} ref={banjoRef}>
      <mesh castShadow receiveShadow geometry={nodes.Cube001.geometry} material={materials.Wood} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001_1.geometry}
        material={materials.Yellow}
      />
      <mesh castShadow receiveShadow geometry={nodes.Cube001_2.geometry} material={materials.Red} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001_3.geometry}
        material={materials.Yellow_2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001_4.geometry}
        material={materials.String}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/Banjo.glb')
export default Banjo
