import { useGLTF } from '@react-three/drei'

const Theater = (props) => {
  const { nodes, materials } = useGLTF('../assets/models/Theater.glb')

  return (
    <group {...props} dispose={null}>
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
