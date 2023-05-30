import { useGLTF } from '@react-three/drei'

const Ufo = (props) => {
  const { nodes, materials } = useGLTF('../assets/models/Ufo.glb')

  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.UFO.geometry} material={materials.Metal} />
      <mesh castShadow receiveShadow geometry={nodes.UFO_1.geometry} material={materials.Glass} />
    </group>
  )
}

useGLTF.preload('../assets/models/Ufo.glb')
export default Ufo
