import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'

const Transmitter = ({ debug = true, ...props }) => {
  const transmitterRotation = useRef()
  const { nodes, materials } = useGLTF('../assets/models/Transmitter.glb')

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()

    // Update rotation
    transmitterRotation.current.rotation.y = elapsedTime / 2
  })

  return (
    <group {...props} dispose={null} ref={transmitterRotation}>
      <RigidBody type={'fixed'} colliders={'hull'}>
        <mesh position={[0, 5, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[4.8, 4.8, 10, 8]} />
          <meshStandardMaterial color="green" transparent={!debug} opacity={debug ? 1 : 0} />
        </mesh>
      </RigidBody>
      <mesh castShadow receiveShadow geometry={nodes.Cube001.geometry} material={materials.Tower} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001_1.geometry}
        material={materials.TowerRed}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/Transmitter.glb')
export default Transmitter
