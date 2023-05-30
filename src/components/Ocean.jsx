import { useGLTF } from '@react-three/drei'

const Ocean = (props) => {
  const { nodes, materials } = useGLTF('../assets/models/Ocean.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ocean.geometry}
        material={materials.Ocean}
        position={[0, 0.04, 0]}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/Ocean.glb')
export default Ocean
