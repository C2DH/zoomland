import { useGLTF } from '@react-three/drei'

const Cinema = (props) => {
  const { nodes, materials } = useGLTF('../assets/models/Cinema.glb')

  return (
    <group {...props} dispose={null}>
      <group rotation={[0, 0, -Math.PI / 2]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cinema_1.geometry}
          material={materials.Roof}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cinema_2.geometry}
          material={materials.Walls}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cinema_3.geometry}
          material={materials.Base}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cinema_4.geometry}
          material={materials.Wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cinema_5.geometry}
          material={materials.Base}
        />
      </group>
    </group>
  )
}

useGLTF.preload('../assets/models/Cinema.glb')
export default Cinema
