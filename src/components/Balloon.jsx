import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const Balloon = (props) => {
  const balloonRef = useRef()
  const { nodes, materials } = useGLTF('../assets/models/Balloon.glb')
  // const seed = Math.random() + 0.8
  // Animate the tree
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime() / 10
    const positionFactor = Math.sin(time) * 7.5 + 10
    balloonRef.current.position.y = positionFactor * 2
    balloonRef.current.rotation.y += 0.001
  })
  return (
    <group {...props} dispose={null} ref={balloonRef}>
      <mesh castShadow receiveShadow geometry={nodes.Balloon.geometry} material={materials.Blue} />
      <mesh castShadow receiveShadow geometry={nodes.Balloon_1.geometry} material={materials.Red} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Balloon_2.geometry}
        material={materials.Wood}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/Balloon.glb')
export default Balloon
