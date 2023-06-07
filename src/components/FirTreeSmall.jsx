import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const FirTreeSmall = (props) => {
  const treeRef = useRef()
  const { nodes, materials } = useGLTF('../assets/models/FirTreeSmall.glb')
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
        geometry={nodes.Sphere_1.geometry}
        material={materials.Green}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere_2.geometry}
        material={materials.LightGreen}
      />
      <mesh castShadow receiveShadow geometry={nodes.Sphere_3.geometry} material={materials.Wood} />
      <mesh castShadow receiveShadow geometry={nodes.Sphere_4.geometry} material={materials.Red} />
      <mesh castShadow receiveShadow geometry={nodes.Sphere_5.geometry} material={materials.Red} />
      <mesh castShadow receiveShadow geometry={nodes.Sphere_6.geometry} material={materials.Red} />
      <mesh castShadow receiveShadow geometry={nodes.Sphere_7.geometry} material={materials.Red} />
      <mesh castShadow receiveShadow geometry={nodes.Sphere_8.geometry} material={materials.Red} />
      <mesh castShadow receiveShadow geometry={nodes.Sphere_9.geometry} material={materials.Red} />
      <mesh castShadow receiveShadow geometry={nodes.Sphere_10.geometry} material={materials.Red} />
      <mesh castShadow receiveShadow geometry={nodes.Sphere_11.geometry} material={materials.Red} />
      <mesh castShadow receiveShadow geometry={nodes.Sphere_12.geometry} material={materials.Red} />
      <mesh castShadow receiveShadow geometry={nodes.Sphere_13.geometry} material={materials.Red} />
    </group>
  )
}

useGLTF.preload('../assets/models/FirTreeSmall.glb')
export default FirTreeSmall
