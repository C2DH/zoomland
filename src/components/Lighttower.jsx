import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { getFrontSideMaterial } from '../utils/common'

const Lighttower = (props) => {
  const { nodes, materials } = useGLTF('assets/models/Lighttower.glb')
  return (
    <group {...props} dispose={null}>
      <RigidBody type={'fixed'} colliders={'hull'}>
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
      </RigidBody>
    </group>
  )
}

useGLTF.preload('assets/models/Lighttower.glb')
export default Lighttower
