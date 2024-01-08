import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

const StoneBig = (props) => {
  const { nodes, materials } = useGLTF('assets/models/StoneBig.glb')
  return (
    <>
      <RigidBody colliders={'hull'} type={'fixed'} castShadow receiveShadow>
        <group {...props} dispose={null}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Icosphere012.geometry}
            material={materials.pierre}
          />
        </group>
      </RigidBody>
    </>
  )
}

useGLTF.preload('assets/models/StoneBig.glb')
export default StoneBig
