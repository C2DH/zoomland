import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Airship(props) {
  const mesh = useRef()
  const fanRotation = useRef()
  //rotate around the center
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const r = -2.5
    const x = r * Math.cos(t / 20) * 20
    const z = r * Math.sin(t / 20) * 20
    const y = 50 + 5 * Math.sin(t / 5)
    // move clockwise

    mesh.current.position.set(x, y, z)
    // rotate according to the direction of movement
    mesh.current.rotation.y = Math.atan2(x, z) - Math.PI
  })

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()

    // Update rotation
    fanRotation.current.rotation.x = elapsedTime * 5
  })

  const { nodes, materials } = useGLTF('../assets/models/Airship.glb')
  return (
    <group ref={mesh} {...props} dispose={null}>
      <mesh
        ref={fanRotation}
        geometry={nodes.Fan.geometry}
        material={materials.Metal}
        position={[-8.51, 0, 0]}
        rotation={[-Math.PI, 0, 0]}
        scale={[-0.75, -0.13, -0.13]}
      />
      <mesh geometry={nodes.Airship_1.geometry} material={materials.White} />
      <mesh geometry={nodes.Airship_2.geometry} material={materials.Red} />
      <mesh geometry={nodes.Airship_3.geometry} material={materials.Material} />
      <mesh geometry={nodes.Airship_4.geometry} material={materials.Metal} />
      <mesh geometry={nodes.Airship_5.geometry} material={materials.Logo} />
      <mesh geometry={nodes.Airship_6.geometry} material={materials.Logo_2} />
    </group>
  )
}

useGLTF.preload('../assets/models/Airship.glb')
