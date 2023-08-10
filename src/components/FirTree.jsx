import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import { getFrontSideMaterial } from '../utils/common'

const FirTree = (props) => {
  const treeRef = useRef()
  const { nodes, materials } = useGLTF('../assets/models/FirTree.glb')
  const seed = Math.random() + 0.8
  // Animate the tree
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const bendFactor = Math.sin(time * seed) * 0.3 + 0.3
    treeRef.current.rotation.z = bendFactor * 0.1
    treeRef.current.rotation.y = bendFactor * 0.15
  })

  return (
    <group {...props} dispose={null} ref={treeRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cone.geometry}
        material={materials.Wood}
        position={[0.02, 0, 0.05]}
        scale={1.22}
      />
      <group position={[-0.13, 1.59, -0.29]} scale={[1, 3.11, 1]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_1.geometry}
          material={getFrontSideMaterial(materials.Green)}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_2.geometry}
          material={getFrontSideMaterial(materials.LightGreen)}
        />
      </group>
    </group>
  )
}

useGLTF.preload('../assets/models/FirTree.glb')
export default FirTree
