import { useGLTF } from '@react-three/drei'

const Mushroom = (props) => {
  const { nodes, materials } = useGLTF('../assets/models/Mushroom.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder023_1.geometry}
        material={materials['champi rouge tige']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder023_2.geometry}
        material={materials['champi rouge chapeau']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder023_3.geometry}
        material={materials['champi rouge sous chapeau']}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/Mushroom.glb')
export default Mushroom
