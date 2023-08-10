import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { getFrontSideMaterial } from '../utils/common'

const StoneBig = (props, transparent = true, geometryPosition = [0, 0, 0]) => {
  const { nodes, materials } = useGLTF('../assets/models/StoneBig.glb')
  return (
    <>
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
            geometry={nodes.Icosphere012.geometry}
            material={getFrontSideMaterial(materials.pierre)}
          />
        </group>
      </RigidBody>
    </>
  )
}

useGLTF.preload('../assets/models/StoneBig.glb')
export default StoneBig
