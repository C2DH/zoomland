import { useGLTF } from '@react-three/drei'

const IcescreamTruck = (props) => {
  const { nodes, materials } = useGLTF('../assets/models/IcescreamTruck.glb')

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ice_Cream_Truck.geometry}
        material={materials['Ice Cream Truck Material']}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/IcescreamTruck.glb')
export default IcescreamTruck
