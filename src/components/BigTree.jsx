import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const BigTree = (props) => {
  const treeRef = useRef()
  const { nodes, materials } = useGLTF('../assets/models/BigTree.glb')
  const seed = Math.random() + 0.8
  // Animate the tree
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const bendFactor = Math.sin(time * seed) * 0.2 + 0.2
    treeRef.current.rotation.z = bendFactor * 0.06
    treeRef.current.rotation.y = bendFactor * 0.06
  })
  return (
    <group {...props} dispose={null} ref={treeRef}>
      <mesh castShadow receiveShadow geometry={nodes.BigTree.geometry} material={materials.Leafs} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BigTree_1.geometry}
        material={materials.TreeTrunk}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/BigTree.glb')
export default BigTree
