import { useGLTF } from '@react-three/drei'
import { MeshStandardMaterial } from 'three'

const Umbrella = ({ color, ...props }) => {
  const { nodes, materials } = useGLTF('../assets/models/Umbrella.glb')
  const fabricMaterial = new MeshStandardMaterial({
    ...materials.Fabric,
    color: color,
  })

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane003_1.geometry}
        material={materials.Stick}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane003_2.geometry}
        material={fabricMaterial}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/Umbrella.glb')
export default Umbrella
