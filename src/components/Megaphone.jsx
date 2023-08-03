import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const Megaphone = (props) => {
  const megaphoneRef = useRef()
  const { nodes, materials } = useGLTF('../assets/models/Megaphone.glb')
  const seed = 0.8
  // Animate the tree
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const positionFactor = Math.sin(time * seed) * 0.1
    megaphoneRef.current.position.y = 0.7 + positionFactor
    megaphoneRef.current.rotation.y += 0.005
  })
  return (
    <group {...props} dispose={null} ref={megaphoneRef}>
      <group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Megaphone.geometry}
          material={materials.Red}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Megaphone_1.geometry}
          material={materials.Metal}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Megaphone_2.geometry}
          material={materials.Blue}
        />
      </group>
    </group>
  )
}

useGLTF.preload('../assets/models/Megaphone.glb')
export default Megaphone
