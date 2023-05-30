import { useGLTF } from '@react-three/drei'

const Cloud = (props) => {
  const { nodes, materials } = useGLTF('../assets/models/Cloud.glb')

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere001.geometry}
        material={materials.Material}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/Cloud.glb')
export default Cloud
