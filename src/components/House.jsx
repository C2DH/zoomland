import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { getFrontSideMaterial } from '../utils/common'

const House = (props, transparent = true, geometryPosition = [0, 0, 0]) => {
  const { nodes, materials } = useGLTF('../assets/models/House.glb')

  return (
    <RigidBody colliders={'hull'} type={'fixed'}>
      <mesh position={geometryPosition}>
        <cylinderGeometry />
        <meshStandardMaterial
          color="green"
          transparent={transparent}
          opacity={transparent ? 0 : 0.7}
        />
      </mesh>
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.House_1.geometry}
          material={getFrontSideMaterial(materials.Walls)}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.House_2.geometry}
          material={getFrontSideMaterial(materials.Roof)}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.House_3.geometry}
          material={getFrontSideMaterial(materials.Glass)}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.House_4.geometry}
          material={materials.Wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.House_5.geometry}
          material={materials.Base}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.House_6.geometry}
          material={materials.Roof}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.House_7.geometry}
          material={materials.Roof}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.House_8.geometry}
          material={materials.Roof}
        />
      </group>
    </RigidBody>
  )
}

useGLTF.preload('../assets/models/House.glb')
export default House
