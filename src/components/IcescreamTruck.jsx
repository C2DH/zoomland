import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

const IcescreamTruck = (props, transparent = true, geometryPosition = [0, 0, 0]) => {
  const { nodes, materials } = useGLTF('../assets/models/IcescreamTruck.glb')

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
          geometry={nodes.Ice_Cream_Truck.geometry}
          material={materials['Ice Cream Truck Material']}
        />
      </group>
    </RigidBody>
  )
}

useGLTF.preload('../assets/models/IcescreamTruck.glb')
export default IcescreamTruck
