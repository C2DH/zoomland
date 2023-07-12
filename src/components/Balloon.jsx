import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'

const Balloon = (props) => {
  const balloonRef = useRef()
  const { nodes, materials } = useGLTF('../assets/models/Balloon.glb')
  // const seed = Math.random() + 0.8
  // Animate the tree
  // useFrame((state, delta) => {
  //   const time = state.clock.getElapsedTime() / 10
  //   const positionFactor = Math.sin(time) * 10 + 10
  //   balloonRef.current.position.y = positionFactor * 2
  //   // balloonRef.current.rotation.y += 0.001
  // })
  return (
    <>
      {/* <RigidBody position={[0, 0, 0]} rotation={[0, 0, 0]} colliders={'cuboid'} type={'fixed'}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            depthWrite={false}
            // opacity={debug ? 1 : 0}
            color={'blue'}
          />
        </mesh>
      </RigidBody> */}
      <group {...props} dispose={null} ref={balloonRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Balloon.geometry}
          material={materials.Blue}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Balloon_1.geometry}
          material={materials.Red}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Balloon_2.geometry}
          material={materials.Wood}
        />
      </group>
    </>
  )
}

useGLTF.preload('../assets/models/Balloon.glb')
export default Balloon
