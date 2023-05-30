import { useGLTF } from '@react-three/drei'

const Antenna = (props) => {
  const { nodes, materials } = useGLTF('../assets/models/Antenna.glb')

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Antenna.geometry}
        material={materials.Antenna_Metal}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/Antenna.glb')
export default Antenna
