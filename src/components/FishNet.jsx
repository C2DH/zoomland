import { useGLTF } from '@react-three/drei'

const FishNet = (props) => {
  const { nodes, materials } = useGLTF('assets/models/FishNet.glb')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Floats.geometry} material={materials.Floats} />
      <mesh castShadow receiveShadow geometry={nodes.Net.geometry} material={materials.Net} />
      <mesh castShadow receiveShadow geometry={nodes.Sticks.geometry} material={materials.Wood} />
    </group>
  )
}

useGLTF.preload('assets/models/FishNet.glb')
export default FishNet
