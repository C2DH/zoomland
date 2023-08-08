import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

const Antenna = ({ debug = true, ...props }) => {
  const { nodes, materials } = useGLTF('../assets/models/Antenna.glb')

  return (
    <group {...props} dispose={null}>
      <RigidBody type={'fixed'} colliders={'hull'}>
        <mesh position={[1, 0, -1]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.3, 6, 0.3]} />
          <meshStandardMaterial color="green" transparent={!debug} opacity={debug ? 1 : 0} />
        </mesh>
        <mesh position={[-1, 0, 1]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.3, 6, 0.3]} />
          <meshStandardMaterial color="green" transparent={!debug} opacity={debug ? 1 : 0} />
        </mesh>
        <mesh position={[-1, 0, -1]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.3, 6, 0.3]} />
          <meshStandardMaterial color="green" transparent={!debug} opacity={debug ? 1 : 0} />
        </mesh>
        <mesh position={[1, 0, 1]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.3, 6, 0.3]} />
          <meshStandardMaterial color="green" transparent={!debug} opacity={debug ? 1 : 0} />
        </mesh>
      </RigidBody>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Antenna.geometry}
        material={materials.Antenna_Metal}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/Antenna.glb')
export default Antenna
