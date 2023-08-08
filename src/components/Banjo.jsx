import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'

const Banjo = ({ debug = true, ...props }) => {
  const banjoRef = useRef()
  const { nodes, materials } = useGLTF('../assets/models/Banjo.glb')
  const seed = 0.8
  // Animate the tree
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const positionFactor = Math.sin(time * seed) * 0.1
    banjoRef.current.position.y = 13 + positionFactor
    banjoRef.current.rotation.y += 0.005
  })
  return (
    <group {...props} dispose={null} ref={banjoRef}>
      <RigidBody type={'fixed'} colliders={'hull'}>
        <mesh position={[1.1, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.35, 3, 0.65]} />
          <meshStandardMaterial color="green" transparent={!debug} opacity={debug ? 1 : 0} />
        </mesh>
      </RigidBody>
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
