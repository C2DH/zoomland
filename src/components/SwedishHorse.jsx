import { useGLTF } from '@react-three/drei'

const SwedishHorse = (props) => {
  const { nodes, materials } = useGLTF('../assets/models/SwedishHorse.glb')

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.horse_LP_phong1_0.geometry}
        material={materials.HorseBaseColor}
        scale={0.09}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/SwedishHorse.glb')
export default SwedishHorse
