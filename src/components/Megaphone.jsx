import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'

const Megaphone = ({ debug = true, ...props }) => {
  const megaphoneRef = useRef()
  const { nodes, materials } = useGLTF('../assets/models/Megaphone.glb')
  const seed = 0.8
  // Animate the tree
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const positionFactor = Math.sin(time * seed) * 0.1
    megaphoneRef.current.position.y = 6.6 + positionFactor
    megaphoneRef.current.rotation.y += 0.005
  })
  return (
    <group {...props} dispose={null} ref={megaphoneRef}>
      <RigidBody type={'fixed'} colliders={'hull'}>
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[1, 5, 1]} />
          <meshStandardMaterial color="green" transparent={!debug} opacity={debug ? 1 : 0} />
        </mesh>
      </RigidBody>
      <group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Megaphone.geometry}
          material={materials.Red}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Megaphone_1.geometry}
          material={materials.Metal}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Megaphone_2.geometry}
          material={materials.Blue}
        />
      </group>
    </group>
  )
}

useGLTF.preload('../assets/models/Megaphone.glb')
export default Megaphone
