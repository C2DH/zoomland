import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const Boat = (props) => {
  const boatRef = useRef()
  const { nodes, materials } = useGLTF('../assets/models/Boat.glb')
  const seed = Math.random() + 0.8
  // Animate the tree
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const bendFactor = Math.sin(time * seed) * 0.2 + 0.2
    boatRef.current.rotation.z = bendFactor * 0.15
    boatRef.current.rotation.y = bendFactor * 0.1
  })
  return (
    <group {...props} dispose={null} ref={boatRef}>
      <group position={[-0.17, 0.12, 0.03]} rotation={[0, 3, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane016.geometry}
          material={materials.Metal}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane016_1.geometry}
          material={materials.Sale}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane016_2.geometry}
          material={materials.Wood}
        />
      </group>
    </group>
  )
}

useGLTF.preload('../assets/models/Boat.glb')
export default Boat
