import { useGLTF } from '@react-three/drei'

const StoneBig = (props) => {
  const { nodes, materials } = useGLTF('../assets/models/StoneBig.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere012.geometry}
        material={materials.pierre}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/StoneBig.glb')
export default StoneBig
