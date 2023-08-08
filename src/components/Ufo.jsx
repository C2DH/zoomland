import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

const Ufo = ({ debug = true, ...props }) => {
  const { nodes, materials } = useGLTF('../assets/models/Ufo.glb')

  return (
    <group {...props} dispose={null}>
      <RigidBody type={'fixed'} colliders={'hull'}>
        <mesh position={[4.7, 0, 8]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.35, 3, 0.65]} />
          <meshStandardMaterial color="green" transparent={!debug} opacity={debug ? 1 : 0} />
        </mesh>
        <mesh position={[4.7, 0, -8]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.35, 3, 0.65]} />
          <meshStandardMaterial color="green" transparent={!debug} opacity={debug ? 1 : 0} />
        </mesh>
        <mesh position={[-9, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.35, 3, 0.65]} />
          <meshStandardMaterial color="green" transparent={!debug} opacity={debug ? 1 : 0} />
        </mesh>
      </RigidBody>
      <mesh castShadow receiveShadow geometry={nodes.UFO.geometry} material={materials.Metal} />
      <mesh castShadow receiveShadow geometry={nodes.UFO_1.geometry} material={materials.Glass} />
    </group>
  )
}

useGLTF.preload('../assets/models/Ufo.glb')
export default Ufo
