import { useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Link } from 'react-router-dom'

const Map = () => {
  const { nodes, materials } = useGLTF('../assets/models/Landscape.glb')
  return (
    <div className="page">
      <h2>
        <Link to="/">back</Link>
      </h2>
      <h1>Map</h1>
      <Canvas camera={{ position: [20.8923846860428, 20.97427986352267, 20.68959842565253] }}>
        <ambientLight />
        <group dispose={null}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Map.geometry}
            material={materials.Land}
            position={[0, 0.05, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ocean.geometry}
            material={materials.Material}
            position={[0, 0.04, 0]}
            scale={23.34}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text.geometry}
            material={nodes.Text.material}
            position={[-8.52, 6.09, -7.63]}
            rotation={[Math.PI / 2, 0, -0.92]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Bridge.geometry}
            material={materials['Bridge.002']}
            scale={-0.35}
          />
        </group>
      </Canvas>
    </div>
  )
}

useGLTF.preload('../assets/models/Landscape.glb')
export default Map
