import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { getFrontSideMaterial } from '../utils/common'

const Lighttower = ({ debug = true, ...props }) => {
  const { nodes, materials } = useGLTF('../assets/models/Lighttower.glb')
  return (
    <group {...props} dispose={null}>
      <RigidBody type={'fixed'} colliders={'hull'}>
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.7, 5, 8]} />
          <meshStandardMaterial color="green" transparent={!debug} opacity={debug ? 1 : 0} />
        </mesh>
      </RigidBody>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lighthouse.geometry}
        material={getFrontSideMaterial(materials.Walls)}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lighthouse_1.geometry}
        material={getFrontSideMaterial(materials.Red)}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lighthouse_2.geometry}
        material={materials.Blue}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lighthouse_3.geometry}
        material={getFrontSideMaterial(materials.Base)}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/Lighttower.glb')
export default Lighttower
