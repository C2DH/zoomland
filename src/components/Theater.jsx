import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

const Theater = ({ debug = true, ...props }) => {
  const { nodes, materials } = useGLTF('../assets/models/Theater.glb')

  return (
    <group {...props} dispose={null}>
      <RigidBody type={'fixed'} colliders={'hull'}>
        <mesh position={[0, 0, 0]} rotation={[0, -0.01, 0]}>
          <boxGeometry args={[4.65, 3.2, 2.6]} />
          <meshStandardMaterial color="green" transparent={!debug} opacity={debug ? 1 : 0} />
        </mesh>
      </RigidBody>
      <group rotation={[0, 0, -Math.PI / 2]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.THEATER_1.geometry}
          material={materials.Roof}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.THEATER_2.geometry}
          material={materials.Walls}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.THEATER_3.geometry}
          material={materials.Base}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.THEATER_4.geometry}
          material={materials.Wood}
        />
      </group>
    </group>
  )
}

useGLTF.preload('../assets/models/Theater.glb')
export default Theater
