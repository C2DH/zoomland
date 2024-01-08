import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

const ObservationTower = (props, transparent = true, geometryPosition = [0, 0, 0]) => {
  const { nodes, materials } = useGLTF('assets/models/ObservationTower.glb')

  return (
    <RigidBody colliders={'hull'} type={'fixed'}>
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={materials.Tower}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002_1.geometry}
          material={materials.TowerRed}
        />
      </group>
    </RigidBody>
  )
}

useGLTF.preload('assets/models/ObservationTower.glb')
export default ObservationTower
