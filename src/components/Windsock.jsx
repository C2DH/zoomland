import React, { useRef, useEffect } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Windsock(props) {
  const group = useRef()
  const sockSpin = useRef()
  const { nodes, materials, animations } = useGLTF('../assets/models/Windsock.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    actions['KeyAction.001'].play()
  }, [])
  const seed = Math.random() + 0.8

  // Animate the tree
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime() / 2
    const bendFactor = Math.sin(time * seed) * 0.3 + 0.3
    sockSpin.current.rotation.z = bendFactor * 1.2
  })
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Plane001"
          castShadow
          receiveShadow
          geometry={nodes.Plane001.geometry}
          material={materials.Metal}
          rotation={[Math.PI / 2, 0.92, Math.PI]}
          scale={[1.71, 1, 0.05]}
        />
        <group
          ref={sockSpin}
          name="Torus001"
          position={[0.15, 12.1, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.8}
        >
          <mesh
            name="Sock"
            castShadow
            receiveShadow
            geometry={nodes.Sock.geometry}
            material={materials.Red}
            morphTargetDictionary={nodes.Sock.morphTargetDictionary}
            morphTargetInfluences={nodes.Sock.morphTargetInfluences}
          />
          <mesh
            name="Sock_1"
            castShadow
            receiveShadow
            geometry={nodes.Sock_1.geometry}
            material={materials.White}
            morphTargetDictionary={nodes.Sock_1.morphTargetDictionary}
            morphTargetInfluences={nodes.Sock_1.morphTargetInfluences}
          />
          <mesh
            name="Sock_2"
            castShadow
            receiveShadow
            geometry={nodes.Sock_2.geometry}
            material={materials.Metal}
            morphTargetDictionary={nodes.Sock_2.morphTargetDictionary}
            morphTargetInfluences={nodes.Sock_2.morphTargetInfluences}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('../assets/models/Windsock.glb')

export default Windsock
