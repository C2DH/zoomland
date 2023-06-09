import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'

const BirdEyeViewSign = ({ color, ...props }) => {
  const signRef = useRef()
  const { nodes, materials } = useGLTF('../assets/models/BirdEyeViewSign.glb')
  const seed = 0.8
  // Animate the tree
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const positionFactor = Math.sin(time * seed) * 0.1
    signRef.current.position.y = 0.5 + positionFactor
    signRef.current.rotation.y += 0.005
  })

  //Pick color - Media #A25FFF, History, Hermeneutics, Digital landscapes
  console.log('COLOR_SIGNM', color)
  const signColor = new MeshStandardMaterial({
    ...materials.Media,
    color: color,
  })

  return (
    <group {...props} dispose={null} ref={signRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle.geometry}
        material={materials.Metal}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.32}
      />
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BirdsEyeViewSign_1.geometry}
          material={materials.Metal}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BirdsEyeViewSign_2.geometry}
          material={signColor}
        />
      </group>
    </group>
  )
}

useGLTF.preload('../assets/models/BirdEyeViewSign.glb')
export default BirdEyeViewSign
