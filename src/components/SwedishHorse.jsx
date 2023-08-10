import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { getFrontSideMaterial } from '../utils/common'

const SwedishHorse = ({ debug = true, ...props }) => {
  const { nodes, materials } = useGLTF('../assets/models/SwedishHorse.glb')

  return (
    <group {...props} dispose={null}>
      <RigidBody type={'fixed'} colliders={'hull'}>
        <mesh position={[1.1, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.35, 3, 0.65]} />
          <meshStandardMaterial color="green" transparent={!debug} opacity={debug ? 1 : 0} />
        </mesh>
        <mesh position={[-0.45, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.3, 3, 0.65]} />
          <meshStandardMaterial color="green" transparent={!debug} opacity={debug ? 1 : 0} />
        </mesh>
      </RigidBody>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.horse_LP_phong1_0.geometry}
        material={getFrontSideMaterial(materials.HorseBaseColor)}
        scale={0.09}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/SwedishHorse.glb')
export default SwedishHorse
