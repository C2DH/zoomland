import { useGLTF } from '@react-three/drei'

const Arch = (props) => {
  const { nodes, materials } = useGLTF('../assets/models/Arch.glb')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Arch.geometry} material={materials.pierre} />
    </group>
  )
}

useGLTF.preload('../assets/models/Arch.glb')
export default Arch
