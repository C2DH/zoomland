import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { getFrontSideMaterial } from '../utils/common'

const Windmill = ({ debug = true, ...props }) => {
  const fanRotation = useRef()
  const { nodes, materials } = useGLTF('../assets/models/WindMill.glb')

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()

    // Update rotation
    fanRotation.current.rotation.z = elapsedTime / 4
  })
  return (
    <group {...props} dispose={null}>
      <RigidBody type={'fixed'} colliders={'hull'}>
        <mesh position={[0, 5, 1]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[9, 9, 10, 8]} />
          <meshStandardMaterial color="green" transparent={!debug} opacity={debug ? 1 : 0} />
        </mesh>
        <mesh position={[0, 2, 8.6]} rotation={[0, -0.01, 0]}>
          <boxGeometry args={[12, 10, 5]} />
          <meshStandardMaterial color="green" transparent={!debug} opacity={debug ? 1 : 0} />
        </mesh>
      </RigidBody>
      <group position={[-0.01, 36.41, 14.01]} ref={fanRotation}>
        <mesh castShadow receiveShadow geometry={nodes.Fan_1.geometry} material={materials.Wood} />
        <mesh castShadow receiveShadow geometry={nodes.Fan_2.geometry} material={materials.Walls} />
        <mesh castShadow receiveShadow geometry={nodes.Fan_3.geometry} material={materials.Metal} />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shad_1.geometry}
        material={getFrontSideMaterial(materials.Metal)}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shad_2.geometry}
        material={getFrontSideMaterial(materials.Walls)}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shad_3.geometry}
        material={getFrontSideMaterial(materials.Blue)}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shad_4.geometry}
        material={getFrontSideMaterial(materials.Material)}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shad_5.geometry}
        material={getFrontSideMaterial(materials.Wood)}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.House_1.geometry}
        material={getFrontSideMaterial(materials.Blue)}
      />
      <mesh castShadow receiveShadow geometry={nodes.House_2.geometry} material={materials.Metal} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.House_3.geometry}
        material={getFrontSideMaterial(materials.Material)}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.House_4.geometry}
        material={getFrontSideMaterial(materials.Wood)}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/WindMill.glb')
export default Windmill
