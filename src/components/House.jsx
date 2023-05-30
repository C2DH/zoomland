import { useGLTF } from '@react-three/drei'

const House = (props) => {
  const { nodes, materials } = useGLTF('../assets/models/House.glb')

  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.House_1.geometry} material={materials.Walls} />
      <mesh castShadow receiveShadow geometry={nodes.House_2.geometry} material={materials.Roof} />
      <mesh castShadow receiveShadow geometry={nodes.House_3.geometry} material={materials.Glass} />
      <mesh castShadow receiveShadow geometry={nodes.House_4.geometry} material={materials.Wood} />
      <mesh castShadow receiveShadow geometry={nodes.House_5.geometry} material={materials.Base} />
      <mesh castShadow receiveShadow geometry={nodes.House_6.geometry} material={materials.Roof} />
      <mesh castShadow receiveShadow geometry={nodes.House_7.geometry} material={materials.Roof} />
      <mesh castShadow receiveShadow geometry={nodes.House_8.geometry} material={materials.Roof} />
    </group>
  )
}

useGLTF.preload('../assets/models/House.glb')
export default House
