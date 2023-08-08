import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

const Arch = ({ debug = true, ...props }) => {
  const { nodes, materials } = useGLTF('../assets/models/Arch.glb')
  return (
    <group {...props} dispose={null}>
      <RigidBody type={'fixed'} colliders={'hull'}>
        <mesh position={[-0.1, 0, 1.05]} rotation={[0, -0.01, 0]}>
          <boxGeometry args={[0.8, 3, 0.9]} />
          <meshStandardMaterial color="green" transparent={!debug} opacity={debug ? 1 : 0} />
        </mesh>
        <mesh position={[-0.1, 0, -1.1]} rotation={[0, -0.01, 0]}>
          <boxGeometry args={[0.7, 3, 0.7]} />
          <meshStandardMaterial color="green" transparent={!debug} opacity={debug ? 1 : 0} />
        </mesh>
      </RigidBody>
      <mesh castShadow receiveShadow geometry={nodes.Arch.geometry} material={materials.pierre} />
    </group>
  )
}

useGLTF.preload('../assets/models/Arch.glb')
export default Arch
