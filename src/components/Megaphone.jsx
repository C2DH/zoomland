import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const Megaphone = (props) => {
  const megaphoneRef = useRef()
  const { nodes, materials } = useGLTF('../assets/models/Megaphone.glb')
  const seed = Math.random() + 0.8
  // Animate the tree
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const positionFactor = Math.sin(time * seed) * 0.1 + 0.4
    megaphoneRef.current.position.y = positionFactor * 1.2
    megaphoneRef.current.rotation.y += 0.005
  })
  return (
    <group {...props} dispose={null} ref={megaphoneRef}>
      <group position={[0.01, 1.46, 0.29]}>
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
