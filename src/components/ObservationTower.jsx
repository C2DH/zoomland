import { useGLTF } from '@react-three/drei'

const ObservationTower = (props) => {
  const { nodes, materials } = useGLTF('../assets/models/ObservationTower.glb')

  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Cube002.geometry} material={materials.Tower} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002_1.geometry}
        material={materials.TowerRed}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/ObservationTower.glb')
export default ObservationTower
