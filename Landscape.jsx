/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 Landscape.glb
*/

import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/Landscape.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Map.geometry} material={materials.Land} position={[0, 0.05, 0]} />
      <mesh
        geometry={nodes.Ocean.geometry}
        material={materials.Material}
        position={[0, 0.04, 0]}
        scale={23.34}
      />
      <mesh
        geometry={nodes.Text.geometry}
        material={nodes.Text.material}
        position={[-8.52, 6.09, -7.63]}
        rotation={[Math.PI / 2, 0, -0.92]}
      />
      <mesh geometry={nodes.Bridge.geometry} material={materials['Bridge.002']} scale={-0.35} />
    </group>
  )
}

useGLTF.preload('/Landscape.glb')
