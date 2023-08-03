import { Circle, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Link } from 'react-router-dom'
import { useWorldStore } from '../store'
import RoundButton from '../components/RoundButton'
import CloseIcon from '../components/Svg/CloseIcon'
import { GradientTexture, shaderMaterial } from '@react-three/drei'
import { MeshStandardMaterial } from 'three'
import GroundViewSign from '../components/GroundViewSign'
import BirdEyeViewSign from '../components/BirdEyeViewSign'
import OverheadViewSign from '../components/OverheadViewSign'

const Map = () => {
  const { nodes, materials } = useGLTF('../assets/models/Map.glb')
  const playerPosition = useWorldStore((state) => state.playerPosition)
  const d = 10
  const s = 0.8

  const mapMaterial = new MeshStandardMaterial({
    color: '#5779BC',
    roughness: 0.8,
    metalness: 0.2,
  })

  const zoomlandMaterial = new MeshStandardMaterial({
    color: '#FFFFFF',
    roughness: 0.8,
    metalness: 0.2,
  })

  return (
    <div className="page">
      <div
        style={{
          marginRight: '0.7rem',
          position: 'absolute',
          right: 0,
          top: '1rem',
          zIndex: 'var(--z-index-toggle-sounds)',
        }}
      >
        <RoundButton
          Icon={CloseIcon}
          Color={'var(--dark-blue)'}
          onClick={() => {
            window.history.back()
          }}
        />
      </div>
      {/* <h2>
        <Link to="/">back</Link>
      </h2> */}
      <h1>Map</h1>
      {JSON.stringify(playerPosition)}
      <Canvas
        shadows
        camera={{ position: [20.8923846860428, 20.97427986352267, 20.68959842565253] }}
      >
        <fog attach="fog" color="#1B3381" near={34} far={41} />
        <ambientLight intensity={0.25} />
        <directionalLight
          position={[-40, 40, 40]}
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
        {/* //Pick color - Media #fa953b, History - #306fc5, Hermeneutics - #9e43c8, Digital landscapes - #ed407d, Intro - #333333 */}
        {/* //Windmill */}
        <OverheadViewSign
          animation={false}
          scale={s}
          position={[53.68 / d, 20.77 / d + 0.25, -83.85 / d]}
          rotation={[0, 0.4, 0]}
          color={'#ed407d'}
        />
        {/* Megaphone */}
        <GroundViewSign
          animation={false}
          scale={s}
          position={[64.8 / d, 5.75 / d + 0.25, -49.23 / d]}
          rotation={[0, 0.4, 0]}
          color={'#9e43c8'}
        />
        {/* Zepplin */}
        <BirdEyeViewSign
          animation={false}
          scale={s}
          position={[40.3 / d, 13.23 / d + 0.25, -51.82 / d]}
          rotation={[0, 0.4, 0]}
          color={'#306fc5'}
        />
        {/* Swidish Horse */}
        <GroundViewSign
          animation={false}
          scale={s}
          position={[70.29 / d, 12.6 / d + 0.25, 45.45 / d]}
          rotation={[0, 0.4, 0]}
          color={'#fa953b'}
        />
        {/* Banjo */}
        <GroundViewSign
          animation={false}
          scale={s}
          position={[60.19 / d, 12.66 / d + 0.25, 79.34 / d]}
          rotation={[0, 0.4, 0]}
          color={'#306fc5'}
        />
        {/* Windmill */}
        <OverheadViewSign
          animation={false}
          scale={s}
          position={[-56.74 / d, 27.03 / d + 0.25, -58.56 / d]}
          rotation={[0, 0.4, 0]}
          color={'#306fc5'}
        />
        {/* Arch */}
        <OverheadViewSign
          animation={false}
          scale={s}
          position={[3 / d, 13.06 / d + 0.25, -65.63 / d]}
          rotation={[0, 0.4, 0]}
          color={'#9e43c8'}
        />
        {/* Windsoack */}
        <GroundViewSign
          animation={false}
          scale={s}
          position={[5.7 / d, 9.28 / d + 0.25, 65.96 / d]}
          rotation={[0, 0.4, 0]}
          color={'#ed407d'}
        />
        {/* Umbrella */}
        <OverheadViewSign
          animation={false}
          scale={s}
          position={[-23.23 / d, -0.55 / d + 0.25, 60.58 / d]}
          rotation={[0, 0.4, 0]}
          color={'#fa953b'}
        />
        {/* Balloon */}
        <BirdEyeViewSign
          animation={false}
          scale={s}
          position={[-24.24 / d, 0.14 / d + 0.25, 47.57 / d]}
          rotation={[0, 0.4, 0]}
          color={'#306fc5'}
        />
        {/* Fishnet */}
        <BirdEyeViewSign
          animation={false}
          scale={s}
          position={[1.89 / d, -3.19 / d + 0.45, -29.69 / d]}
          rotation={[0, 0.4, 0]}
          color={'#ed407d'}
        />
        {/* Theatre */}
        <OverheadViewSign
          animation={false}
          scale={s}
          position={[-20.07 / d, -0.66 / d + 0.25, 6.83 / d]}
          rotation={[0, 0.4, 0]}
          color={'#9e43c8'}
        />
        {/* Tower */}
        <OverheadViewSign
          animation={false}
          scale={s}
          position={[-24.31 / d, -0.68 / d + 0.25, -6.94 / d]}
          rotation={[0, 0.4, 0]}
          color={'#fa953b'}
        />
        {/* Tree */}
        <OverheadViewSign
          animation={false}
          scale={s}
          position={[-53.76 / d, 0.23 / d + 0.25, -17.61 / d]}
          rotation={[0, 0.4, 0]}
          color={'#9e43c8'}
        />
        {/* UFO */}
        <BirdEyeViewSign
          animation={false}
          scale={s}
          position={[-76.46 / d, 9.6 / d + 0.25, 21.35 / d]}
          rotation={[0, 0.4, 0]}
          color={'#ed407d'}
        />
        {/* Radar */}
        <GroundViewSign
          animation={false}
          scale={s}
          position={[-72.07 / d, 9.58 / d + 0.25, 62.05 / d]}
          rotation={[0, 0.4, 0]}
          color={'#fa953b'}
        />
        {/* Harbor */}
        <BirdEyeViewSign
          animation={false}
          scale={s}
          position={[89.49 / d, 0.33 + 0.25, -15.27 / d]}
          rotation={[0, 0.4, 0]}
          color={'#333333'}
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
            geometry={nodes.Text.geometry}
            material={zoomlandMaterial}
            position={[-8.516, 6.093, -7.628]}
            rotation={[Math.PI / 2, 0, -0.918]}
          />
          <mesh castShadow receiveShadow geometry={nodes.Map.geometry} material={mapMaterial} />
        </group>
        <mesh position={[-3, 0, -3]}>
          <cylinderGeometry args={[20, 20, 0.1, 32]} />
          <meshStandardMaterial roughness={0.3} color={'#31457C'} toneMapped={true} />
        </mesh>
        <OrbitControls
          minAzimuthAngle={0}
          maxAzimuthAngle={Math.PI / 2.5}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2.5}
          minDistance={10}
          maxDistance={22}
        />
      </Canvas>
      <div
        className="background-pattern-reverce"
        style={{ width: '100vw', zIndex: '-1', top: '0' }}
      ></div>
    </div>
  )
}

useGLTF.preload('../assets/models/Map.glb')
export default Map
