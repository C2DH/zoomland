import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const Kite = (props) => {
  const kiteRef = useRef()
  const { nodes, materials } = useGLTF('../assets/models/Kite.glb')
  const seed = Math.random() + 1
  // Animate the tree
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const bendFactor = Math.sin(time * seed) * 0.3 + 0.8
    kiteRef.current.rotation.z = bendFactor * 0.14
    kiteRef.current.rotation.y = bendFactor * 0.12
    kiteRef.current.rotation.x = bendFactor * 0.15
  })
  return (
    <group {...props} dispose={null} ref={kiteRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={nodes.Cube004.material}
      />
      <mesh castShadow receiveShadow geometry={nodes.Cube004_1.geometry} material={materials.Red} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004_2.geometry}
        material={materials.Blue}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004_3.geometry}
        material={materials.Wood}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004_4.geometry}
        material={nodes.Cube004_4.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004_5.geometry}
        material={nodes.Cube004_5.material}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/Kite.glb')
export default Kite
