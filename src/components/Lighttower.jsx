import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const Lighttower = (props) => {
  const { nodes, materials } = useGLTF('../assets/models/Lighttower.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lighthouse.geometry}
        material={materials.Walls}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lighthouse_1.geometry}
        material={materials.Red}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lighthouse_2.geometry}
        material={materials.Blue}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lighthouse_3.geometry}
        material={materials.Base}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/Lighttower.glb')
export default Lighttower
