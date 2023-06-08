import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Link } from 'react-router-dom'
import { useWorldStore } from '../store'

const Map = () => {
  const { nodes, materials } = useGLTF('../assets/models/Landscape.glb')
  const playerPosition = useWorldStore((state) => state.playerPosition)
  return (
    <div className="page">
      <h2>
        <Link to="/">back</Link>
      </h2>
      <h1>Map</h1>
      {JSON.stringify(playerPosition)}
      <Canvas
        shadows
        camera={{ position: [20.8923846860428, 20.97427986352267, 20.68959842565253] }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight
          position={[20, 40, 20]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-near={20}
          shadow-camera-far={100}
          shadow-camera-top={100}
          shadow-camera-right={100}
          shadow-camera-bottom={-100}
          shadow-camera-left={-100}
          shadow-bias={-0.01}
        />
        <mesh
          position={[playerPosition[0] / 10, playerPosition[1] / 10 + 0.2, playerPosition[2] / 10]}
          scale={0.5}
        >
          <coneGeometry args={[1, 2, 8]} />
          <meshStandardMaterial color="red" />
        </mesh>
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
            position={[6.23, 1.06, -0.87]}
            scale={-0.35}
          />
        </group>
        <mesh receiveShadow position={[0, -0.2, 0]}>
          <cylinderGeometry args={[20, 20, 0.5, 32]} />
          <meshStandardMaterial color="blue" />
        </mesh>
        <OrbitControls
          minAzimuthAngle={0}
          maxAzimuthAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 3}
          minDistance={10}
          maxDistance={30}
        />
      </Canvas>
    </div>
  )
}

useGLTF.preload('../assets/models/Landscape.glb')
export default Map
