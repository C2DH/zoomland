import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const Windmill = (props) => {
  const fanRotation = useRef()
  const { nodes, materials } = useGLTF('../assets/models/WindMill.glb')

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()

    // Update rotation
    fanRotation.current.rotation.z = elapsedTime / 4
  })
  return (
    <group {...props} dispose={null}>
      <group position={[-0.01, 36.41, 14.01]} ref={fanRotation}>
        <mesh castShadow receiveShadow geometry={nodes.Fan_1.geometry} material={materials.Wood} />
        <mesh castShadow receiveShadow geometry={nodes.Fan_2.geometry} material={materials.Walls} />
        <mesh castShadow receiveShadow geometry={nodes.Fan_3.geometry} material={materials.Metal} />
      </group>
      <mesh castShadow receiveShadow geometry={nodes.Shad_1.geometry} material={materials.Metal} />
      <mesh castShadow receiveShadow geometry={nodes.Shad_2.geometry} material={materials.Walls} />
      <mesh castShadow receiveShadow geometry={nodes.Shad_3.geometry} material={materials.Blue} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shad_4.geometry}
        material={materials.Material}
      />
      <mesh castShadow receiveShadow geometry={nodes.Shad_5.geometry} material={materials.Wood} />
      <mesh castShadow receiveShadow geometry={nodes.House_1.geometry} material={materials.Blue} />
      <mesh castShadow receiveShadow geometry={nodes.House_2.geometry} material={materials.Metal} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.House_3.geometry}
        material={materials.Material}
      />
      <mesh castShadow receiveShadow geometry={nodes.House_4.geometry} material={materials.Wood} />
    </group>
  )
}

useGLTF.preload('../assets/models/WindMill.glb')
export default Windmill
