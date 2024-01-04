import { OrbitControls, useGLTF, Text } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useWorldStore } from '../store'
import RoundButton from '../components/RoundButton'
import CloseIcon from '../components/Svg/CloseIcon'
import OceanWater from '../components/OceanWater'
import { MeshStandardMaterial, MeshBasicMaterial } from 'three'
import GroundViewSign from '../components/GroundViewSign'
import BirdEyeViewSign from '../components/BirdEyeViewSign'
import OverheadViewSign from '../components/OverheadViewSign'
import { isMobile } from 'react-device-detect'
import { usePlayerStore } from '../store'
import Chapters from '../data/chapters.json'
import './Map.css'

const Map = () => {
  const collectedChapters = usePlayerStore((state) => state.collectedChapters)
  const collectedChaptersIds = collectedChapters.map((d) => d.id)
  const { nodes } = useGLTF('assets/models/Landscape.glb')
  const playerPosition = useWorldStore((state) => state.playerPosition)
  const d = 10
  const s = 0.8

  const capMaterial = new MeshBasicMaterial({ color: '#d43c5c' })

  const mapMaterial = new MeshStandardMaterial({
    color: '#5779BC',
    roughness: 0.8,
    metalness: 0.1,
  })

  const zoomlandMaterial = new MeshStandardMaterial({
    color: '#FFFFFF',
    roughness: 0.8,
    metalness: 0.2,
  })

  return (
    <div className="page" id="Map">
      <section id="category">
        <div>Introduction</div>
        <div>Hermeneutics</div>
        <div>History</div>
        <div>Digital Landscapes</div>
        <div>Media</div>
      </section>
      <div
        style={{
          marginRight: '0.7rem',
          position: 'absolute',
          right: '1rem',
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

      <h1 className="m-4">Map</h1>

      <Canvas
        shadows
        camera={{ position: [20.8923846860428, 20.97427986352267, 20.68959842565253] }}
      >
        <fog attach="fog" color="#1B3381" near={34} far={41} />
        <ambientLight intensity={0.25} />
        <directionalLight
          position={[-40, 40, 40]}
          intensity={0.8}
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
        {/* //Pick color - Media #fa953b, History - #306fc5, Hermeneutics - #9e43c8, Digital landscapes - #ed407d, Intro - #858585 */}
        {/* //Windmill */}
        <group dispose={null} position={[0, 2, 0]} scale={isMobile ? 0.7 : 1}>
          {/* Harbor - Introduction */}
          <BirdEyeViewSign
            animation={false}
            scale={s}
            position={[
              Chapters[0].position[0] / d,
              Chapters[0].position[1] / d + 0.25,
              Chapters[0].position[2] / d,
            ]}
            rotation={[0, 0.4, 0]}
            color={collectedChaptersIds.includes(Chapters[0].id) ? '#858585' : '#858585'}
            transparent={true}
            opacity={collectedChaptersIds.includes(Chapters[0].id) ? '1' : '0.3'}
          />

          {/* Zepplin */}
          <BirdEyeViewSign
            animation={false}
            scale={s}
            position={[
              Chapters[1].position[0] / d,
              Chapters[1].position[1] / d + 0.25,
              Chapters[1].position[2] / d,
            ]}
            rotation={[0, 0.4, 0]}
            color={collectedChaptersIds.includes(Chapters[1].id) ? '#306fc5' : '#858585'}
            transparent={true}
            opacity={collectedChaptersIds.includes(Chapters[1].id) ? '1' : '0.3'}
          />

          {/* Balloon */}
          <BirdEyeViewSign
            animation={false}
            scale={s}
            position={[
              Chapters[2].position[0] / d,
              Chapters[2].position[1] / d + 0.25,
              Chapters[2].position[2] / d,
            ]}
            rotation={[0, 0.4, 0]}
            color={collectedChaptersIds.includes(Chapters[2].id) ? '#306fc5' : '#858585'}
            transparent={true}
            opacity={collectedChaptersIds.includes(Chapters[2].id) ? '1' : '0.3'}
          />

          {/* Windmill */}
          <OverheadViewSign
            animation={false}
            scale={s}
            position={[
              Chapters[3].position[0] / d,
              Chapters[3].position[1] / d + 0.25,
              Chapters[3].position[2] / d,
            ]}
            rotation={[0, 0.4, 0]}
            color={collectedChaptersIds.includes(Chapters[3].id) ? '#306fc5' : '#858585'}
            transparent={true}
            opacity={collectedChaptersIds.includes(Chapters[3].id) ? '1' : '0.3'}
          />

          {/* Banjo */}
          <GroundViewSign
            animation={false}
            scale={s}
            position={[
              Chapters[4].position[0] / d,
              Chapters[4].position[1] / d + 1.5,
              Chapters[4].position[2] / d,
            ]}
            rotation={[0, 0.4, 0]}
            color={collectedChaptersIds.includes(Chapters[4].id) ? '#306fc5' : '#858585'}
            transparent={true}
            opacity={collectedChaptersIds.includes(Chapters[4].id) ? '1' : '0.3'}
          />

          {/* Umbrella */}
          <OverheadViewSign
            animation={false}
            scale={s}
            position={[
              Chapters[5].position[0] / d,
              Chapters[5].position[1] / d + 0.25,
              Chapters[5].position[2] / d,
            ]}
            rotation={[0, 0.4, 0]}
            color={collectedChaptersIds.includes(Chapters[5].id) ? '#fa953b' : '#858585'}
            transparent={true}
            opacity={collectedChaptersIds.includes(Chapters[5].id) ? '1' : '0.3'}
          />

          {/* Antenna / Tower */}
          <OverheadViewSign
            animation={false}
            scale={s}
            position={[
              Chapters[6].position[0] / d,
              Chapters[6].position[1] / d + 0.25,
              Chapters[6].position[2] / d,
            ]}
            rotation={[0, 0.4, 0]}
            color={collectedChaptersIds.includes(Chapters[6].id) ? '#fa953b' : '#858585'}
            transparent={true}
            opacity={collectedChaptersIds.includes(Chapters[6].id) ? '1' : '0.3'}
          />

          {/* Radar / Transmitter */}
          <GroundViewSign
            animation={false}
            scale={s}
            position={[
              Chapters[7].position[0] / d,
              Chapters[7].position[1] / d + 0.25,
              Chapters[7].position[2] / d,
            ]}
            rotation={[0, 0.4, 0]}
            color={collectedChaptersIds.includes(Chapters[7].id) ? '#fa953b' : '#858585'}
            transparent={true}
            opacity={collectedChaptersIds.includes(Chapters[7].id) ? '1' : '0.3'}
          />

          {/* Swidish Horse */}
          <GroundViewSign
            animation={false}
            scale={s}
            position={[
              Chapters[8].position[0] / d,
              Chapters[8].position[1] / d + 0.25,
              Chapters[8].position[2] / d,
            ]}
            rotation={[0, 0.4, 0]}
            color={collectedChaptersIds.includes(Chapters[8].id) ? '#fa953b' : '#858585'}
            transparent={true}
            opacity={collectedChaptersIds.includes(Chapters[8].id) ? '1' : '0.3'}
          />

          {/* Arch */}
          <OverheadViewSign
            animation={false}
            scale={s}
            position={[
              Chapters[9].position[0] / d,
              Chapters[9].position[1] / d + 0.25,
              Chapters[9].position[2] / d,
            ]}
            // position={[3 / d, 13.06 / d + 0.25, -65.63 / d]}
            rotation={[0, 0.4, 0]}
            color={collectedChaptersIds.includes(Chapters[9].id) ? '#9e43c8' : '#858585'}
            transparent={true}
            opacity={collectedChaptersIds.includes(Chapters[9].id) ? '1' : '0.3'}
          />

          {/* Theatre */}
          <OverheadViewSign
            animation={false}
            scale={s}
            position={[
              Chapters[10].position[0] / d,
              Chapters[10].position[1] / d + 0.25,
              Chapters[10].position[2] / d,
            ]}
            rotation={[0, 0.4, 0]}
            color={collectedChaptersIds.includes(Chapters[10].id) ? '#9e43c8' : '#858585'}
            transparent={true}
            opacity={collectedChaptersIds.includes(Chapters[10].id) ? '1' : '0.3'}
          />

          {/* Big Tree */}
          <OverheadViewSign
            animation={false}
            scale={s}
            position={[
              Chapters[11].position[0] / d,
              Chapters[11].position[1] / d + 0.25,
              Chapters[11].position[2] / d,
            ]}
            rotation={[0, 0.4, 0]}
            color={collectedChaptersIds.includes(Chapters[11].id) ? '#9e43c8' : '#858585'}
            transparent={true}
            opacity={collectedChaptersIds.includes(Chapters[11].id) ? '1' : '0.3'}
          />

          {/* Megaphone */}

          <GroundViewSign
            animation={false}
            scale={s}
            position={[
              Chapters[12].position[0] / d,
              Chapters[12].position[1] / d + 0.25,
              Chapters[12].position[2] / d,
            ]}
            rotation={[0, 0.4, 0]}
            color={collectedChaptersIds.includes(Chapters[12].id) ? '#9e43c8' : '#858585'}
            transparent={true}
            opacity={collectedChaptersIds.includes(Chapters[12].id) ? '1' : '0.3'}
          />

          {/* Fishnet */}
          <BirdEyeViewSign
            animation={false}
            scale={s}
            position={[
              Chapters[13].position[0] / d,
              Chapters[13].position[1] / d + 0.25,
              Chapters[13].position[2] / d,
            ]}
            rotation={[0, 0.4, 0]}
            color={collectedChaptersIds.includes(Chapters[13].id) ? '#ed407d' : '#858585'}
            transparent={true}
            opacity={collectedChaptersIds.includes(Chapters[13].id) ? '1' : '0.3'}
          />

          {/* UFO */}
          <BirdEyeViewSign
            animation={false}
            scale={s}
            position={[
              Chapters[14].position[0] / d,
              Chapters[14].position[1] / d + 0.25,
              Chapters[14].position[2] / d,
            ]}
            rotation={[0, 0.4, 0]}
            color={collectedChaptersIds.includes(Chapters[14].id) ? '#ed407d' : '#858585'}
            transparent={true}
            opacity={collectedChaptersIds.includes(Chapters[14].id) ? '1' : '0.3'}
          />

          {/* Lighttower */}
          <OverheadViewSign
            animation={false}
            scale={s}
            position={[
              Chapters[15].position[0] / d,
              Chapters[15].position[1] / d + 0.25,
              Chapters[15].position[2] / d,
            ]}
            rotation={[0, 0.4, 0]}
            color={collectedChaptersIds.includes(Chapters[15].id) ? '#ed407d' : '#858585'}
            transparent={true}
            opacity={collectedChaptersIds.includes(Chapters[15].id) ? '1' : '0.3'}
          />

          {/* Windsoack */}
          <GroundViewSign
            animation={false}
            scale={s}
            position={[
              Chapters[16].position[0] / d,
              Chapters[16].position[1] / d + 0.25,
              Chapters[16].position[2] / d,
            ]}
            // position={[5.7 / d, 9.28 / d + 0.25, 65.96 / d]}
            rotation={[0, 0.4, 0]}
            color={collectedChaptersIds.includes(Chapters[16].id) ? '#ed407d' : '#858585'}
            transparent={true}
            opacity={collectedChaptersIds.includes(Chapters[16].id) ? '1' : '0.3'}
          />

          <mesh
            position={[playerPosition[0] / d, playerPosition[1] / d + 0.8, playerPosition[2] / d]}
            scale={0.3}
            material={capMaterial}
          >
            MeshBasicMaterial
            <coneGeometry args={[1, 2, 6]} />
          </mesh>
          <mesh
            position={[playerPosition[0] / d, playerPosition[1] / d + 1.4, playerPosition[2] / d]}
            scale={0.3}
            material={capMaterial}
          >
            MeshBasicMaterial
            <cylinderGeometry args={[0.05, 0.05, 1.4, 6]} />
          </mesh>
          <Text
            position={[playerPosition[0] / d, playerPosition[1] / d + 1.8, playerPosition[2] / d]}
            scale={1}
            color="#d43c5c"
            anchorX="center"
            anchorY="middle"
            fontSize={0.3}
            font={'../assets/font/Inter-Bold.ttf'}
          >
            Hi
          </Text>

          <group dispose={null}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Harbor.geometry}
              material={mapMaterial}
              position={[9.121, 0.12, -1.451]}
              rotation={[0, 1.565, 0]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Map.geometry}
              material={mapMaterial}
              position={[0, 0.047, 0]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Text.geometry}
              material={zoomlandMaterial}
              position={[-8.516, 6.093, -7.628]}
              rotation={[Math.PI / 2, 0, -0.918]}
            />
          </group>
          <OceanWater />
        </group>
        <OrbitControls
          minAzimuthAngle={0}
          maxAzimuthAngle={Math.PI / 2.5}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2.5}
          minDistance={10}
          maxDistance={isMobile ? 30 : 22}
        />
      </Canvas>
      <div
        className="background-pattern-reverce"
        style={{ width: '100vw', zIndex: '-1', top: '0' }}
      ></div>
    </div>
  )
}

useGLTF.preload('assets/models/Landscape.glb')
export default Map
