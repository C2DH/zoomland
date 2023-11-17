import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

const SwedishHorse = ({ debug = true, ...props }) => {
  const { nodes, materials } = useGLTF('../assets/models/SwedishHorse.glb')

  return (
    <group {...props} dispose={null}>
      <RigidBody type={'fixed'} colliders={'hull'}>
        <mesh position={[0.3, 0, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 3, 0.65]} />
          <meshStandardMaterial color="green" transparent={!debug} opacity={debug ? 1 : 0} />
        </mesh>
      </RigidBody>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.horse_LP_phong1_0.geometry}
        material={materials.HorseBaseColor}
        scale={0.09}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/SwedishHorse.glb')
export default SwedishHorse
