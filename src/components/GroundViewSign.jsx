import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'

const GroundViewSign = ({ color, ...props }) => {
  const signRef = useRef()
  const { nodes, materials } = useGLTF('../assets/models/GroundViewSign.glb')
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
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.GroundView.geometry} material={signColor} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.GroundView_1.geometry}
          material={materials.Metal}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle.geometry}
        material={materials.Metal}
        position={[0, 0.34, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.32}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/GroundViewSign.glb')
export default GroundViewSign
