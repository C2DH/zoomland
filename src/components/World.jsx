import { Suspense, lazy, useRef, useEffect } from 'react'
import { Box, KeyboardControls, Gltf, OrbitControls, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import Landscape from './Landscape'
import Lights from './Lights'
import Forest from './Forest'
import SmallTree from './SmallTree'
import './World.css'
import '../index.css'
import Player from './Player'
import Chapters from '../data/Chapters'
import Quests from '../data/Quests.json'
import { default as SmallTrees } from '../data/SmallTrees'
import { default as BigTrees } from '../data/BigTrees'
import FirTree from './FirTree'
import FirTreeSmall from './FirTreeSmall'
import Clouds from './Clouds'
import { Airship } from './Airship'
import Target from './Target'
import Pound from './Pound'
import Ocean from './Ocean'
import Windmill from './Windmill'
import Lighthouse from './Lighthouse'
import WindTurbine from './WindTurbine'
import BigTree from './BigTree'
import Antenna from './Antenna'
import SwedishHorse from './SwedishHorse'
import Banjo from './Banjo'
import Megaphone from './Megaphone'
import Ufo from './Ufo'
import Kite from './Kite'
import Balloon from './Balloon'
import Arch from './Arch'
import StoneBig from './StoneBig'
import FishNet from './FishNet'
import Boat from './Boat'
import House from './House'
import Theater from './Theater'
import Umbrella from './Umbrella'
import ObservationTower from './ObservationTower'
import Transmitter from './Transmitter'
import Flag from './Flag'
import TheDispatcher from './TheDispatcher'
import Lumberjack from './Lumberjack'
import IcescreamTruck from './IcescreamTruck'
import Windsock from './Windsock'
import GroundViewSign from './GroundViewSign'
import BirdEyeViewSign from './BirdEyeViewSign'
import OverheadViewSign from './OverheadViewSign'
import Boundaries from './Boundaries'
import Rig from './Rig'
import Grass from './Grass'
import Waves from './Waves'
import Editor from './Editor'
import Daniele from './Daniele'
import Kirill from './Kirill'
import Character from './Character'
import Sensor from './Sensor'
// import { AnimationStoreLoader } from '../store/animations'

const Joystick = lazy(() => import('./Joystick'))
const WorldDashboard = lazy(() => import('./WorldDashboard'))

const FarAwayCamera = {
  position: [111.8923846860428, 132.97427986352267, 100.68959842565253],
}

const CloseCamera = {
  position: [10, 13, 10],
}

const World = ({
  isMobile = false,
  width = 500,
  height = 800,
  debug = false,
  debugPhysics = false,
}) => {
  return (
    <div
      className="World"
      style={{ width, height, marginLeft: -width / 2, marginTop: -height / 2 }}
    >
      {isMobile && (
        <Suspense fallback={null}>
          <Joystick />
        </Suspense>
      )}
      {/* <AnimationStoreLoader /> */}
      <KeyboardControls
        map={[
          { keys: ['KeyW', 'ArrowUp'], name: 'moveForward' },
          { keys: ['KeyS', 'ArrowDown'], name: 'moveBackward' },
          { keys: ['KeyA', 'ArrowLeft'], name: 'moveLeft' },
          { keys: ['KeyD', 'ArrowRight'], name: 'moveRight' },
          { keys: ['Space', 'KeyJ'], name: 'jump' },
          // shift: 'sprint',
          { keys: ['ShiftLeft', 'ShiftRight'], name: 'sprint' },
        ]}
      >
        <Canvas camera={CloseCamera} shadows dpr={1}>
          <Rig />
          <Environment
            files="../../public/evening_road_01_puresky_1k.hdr"
            near={1}
            far={1000}
            // background
            blur={0.08}
          />
          <fog attach="fog" color="#E0DCCF" near={20} far={250} />
          {debug && <WorldDashboard />}
          <Lights />
          <Clouds />
          <Grass position={[0, -2.3, 0]} scale={10} />
          <Waves position={[0, -2, 0]} scale={10} />
          <Airship position={[6, 16, 0]} />
          <Pound />
          <Ocean scale={[12, 12, 12]} position={[0, -2.2, 0]} />
          <Antenna rotation={[0, 0, 0]} scale={[2, 2, 2]} position={[-24.2, -1, -6.8]} />
          <SwedishHorse rotation={[0, -2, 0]} scale={2.2} position={[69.81, 12.3, 45.32]} />
          <Banjo rotation={[0, 0, -0.1]} scale={[0.2, 0.2, 0.2]} position={[17.83, 10.68, 79.68]} />

          <Kite rotation={[0, 0, 0]} scale={[1, 1, 1]} position={[2.06, -3.16, -30.67]} />

          <Boat rotation={[0, 0, 0]} scale={[2.5, 2.5, 2.5]} position={[91.6, -1.6, -10.2]} />
          <FishNet rotation={[0, -2.2, 0]} scale={[2.5, 2.5, 2.5]} position={[2.2, -2.8, -30]} />
          <StoneBig rotation={[0, 1, 0]} scale={[1.5, 1.5, 1.5]} position={[0.4, 14.2, -72.6]} />
          <StoneBig rotation={[0, 0, 0]} scale={[3, 3, 3]} position={[-34.0, 0.3, 31.8]} />
          <StoneBig rotation={[0, 0, 0]} scale={[2, 1.5, 2]} position={[4.8, 12.6, -58.4]} />
          <StoneBig rotation={[1, 1.5, 1]} scale={[2.5, 1.5, 2]} position={[11.2, 12.5, -70.1]} />
          <StoneBig rotation={[1, 1.5, 1]} scale={[2.5, 1.5, 2]} position={[-33.3, 0.8, 33.56]} />
          <StoneBig rotation={[-0.5, 1.8, 1]} scale={[2.7, 2.9, 2.3]} position={[85, 7.2, 6]} />
          <StoneBig
            rotation={[-0.7, 1.9, 1.3]}
            scale={[2.5, 2.5, 2]}
            position={[16.45, 9.8, -50.67]}
          />
          <Theater rotation={[0, 0.2, 0]} scale={[3, 3, 3]} position={[-20, -0.7, 6]} />
          <Transmitter scale={[0.2, 0.2, 0.2]} position={[-71.9, 9.45, 65.5]} />
          <Flag rotation={[0, 2.7, 0]} scale={[0.21, 0.3, 0.21]} position={[60.04, 11.7, 72.7]} />
          <Flag rotation={[0, 2.7, 0]} scale={[0.21, 0.3, 0.21]} position={[-75.3, 10.0, 2.2]} />
          <Flag rotation={[0, 0, 0]} scale={[0.21, 0.21, 0.21]} position={[39.7, 13.1, -52.5]} />
          <ObservationTower scale={[0.1, 0.1, 0.1]} position={[-31.3, -0.3, 59.1]} />
          <Windsock rotation={[0, 0, 0]} scale={0.4} position={[5.1, 8.8, 66]} />

          {/* //Pick color - Media #fa953b, History - #306fc5, Hermeneutics - #9e43c8, Digital landscapes - #ed407d, Intro - #7c7c7c */}
          <GroundViewSign
            rotation={[0, 0, 0]}
            scale={1}
            position={[7.74, 0.36, 17.45]}
            color={'#fa953b'}
          />
          <BirdEyeViewSign
            rotation={[0, 0, 0]}
            scale={1}
            position={[7.74, 0.36, 15.45]}
            color={'#306fc5'}
          />
          <OverheadViewSign
            rotation={[0, 0, 0]}
            scale={1}
            position={[7.74, 0.36, 13.45]}
            color={'#9e43c8'}
          />
          <Umbrella
            rotation={[-0.2, 0, 0.2]}
            scale={[1.5, 1.5, 1.5]}
            position={[-26.3, -0.7, 63.1]}
            color={'#E7DF29'}
          />
          <Umbrella
            rotation={[-0.1, 0, -0.2]}
            scale={[1.5, 1.5, 1.5]}
            position={[-22.7, -0.5, 61.1]}
            color={'#E56C1A'}
          />
          <Umbrella
            rotation={[-0.7, 0, -0.4]}
            scale={[1.5, 1.5, 1.5]}
            position={[-13.1, -1, 64.4]}
            color={'#E7DF29'}
          />
          <House rotation={[0, 0 - 2.2, 0]} scale={[5.5, 5.5, 5.5]} position={[-32, -0.8, -18.4]} />
          <House rotation={[0, -2, 0]} scale={[5.5, 5.5, 5.5]} position={[-10, -0.8, 46]} />
          <House
            rotation={[0, 0 - 1.5, 0]}
            scale={[5.5, 5.5, 5.5]}
            position={[-12.0, -0.8, -24.4]}
          />
          {/*On the hill */}
          <House rotation={[0, 1.5, 0]} scale={[5.5, 5.5, 5.5]} position={[45.2, 12.8, 56.68]} />

          <WindTurbine
            scale={[0.25, 0.25, 0.25]}
            position={[-89, 13.3, 5]}
            rotation={[0, -0.9, 0]}
            rotationSpeed={10}
          />
          <WindTurbine
            scale={[0.25, 0.25, 0.25]}
            position={[-43, 30, -82.1]}
            rotation={[0, -0.9, 0]}
            rotationSpeed={2}
          />
          <WindTurbine
            scale={[0.25, 0.25, 0.25]}
            position={[-21.1, 19.4, -85.9]}
            rotation={[0, -0.9, 0]}
            rotationSpeed={20}
          />
          <WindTurbine
            scale={[0.25, 0.25, 0.25]}
            position={[16.0, 14.2, -88.0]}
            rotation={[0, -0.9, 0]}
            rotationSpeed={2}
          />
          {/*On the hill */}
          <WindTurbine
            scale={[0.25, 0.25, 0.25]}
            position={[92.85, 7.1, 29.54]}
            rotation={[0, -0.9, 0]}
            rotationSpeed={0.3}
          />
          <IcescreamTruck rotation={[0, 1.3, 0]} position={[-8.7, 0.1, 33.23]} scale={1.5} />
          <Physics debug={debugPhysics}>
            <Player isMobile={isMobile} debug={debug} position={[94.88, 0.26, -14.2]}></Player>
            <Landscape receiveShadow position={[0, -2, 0]} scale={10} debug={debug} />
            <Forest positions={BigTrees.positions} scales={BigTrees.scales} maxScale={1.5}>
              <FirTree />
            </Forest>
            <Forest positions={SmallTrees.positions} scales={SmallTrees.scales} maxScale={0.7}>
              <FirTreeSmall />
            </Forest>
            <Balloon rotation={[0, 0, 0]} scale={[3, 3, 3]} position={[-24.3, 0.3, 47.6]} />
            <Target
              chapter={Chapters[0]}
              position={Chapters[0].position}
              color={Chapters[0].color}
              geometryArgs={[2, 2, 0, 8]}
              priceOffsetPosition={[0, -0.5, 0]}
              priceElevation={0.35}
              PriceComponent={GroundViewSign}
              transparent
            ></Target>
            <Target
              chapter={Chapters[3]}
              position={[-60, 27, -58]}
              geometry="cylinder"
              geometryArgs={[3.2, 3.2, 5, 8]}
              additionalGeometry="box"
              additionalGeometryArgs={[5.5, 6, 2]}
              additionalGeometryRotation={[0, 1, 0]}
              additionalGeometryOffsetPosition={[2.5, 0, 2.5]}
              priceOffsetPosition={[0, 0, 5.22]}
              transparent
            >
              <Windmill scale={0.3} rotation={[0, 1, 0]} />
            </Target>
            <Target
              chapter={Chapters[9]}
              position={Chapters[9].position}
              transparent
              childrenIsRigidBody
              height={1}
              priceOffsetPosition={[2, -1, 2]}
            >
              <Arch rotation={[0, 0.3, 0]} scale={[2.4, 2.4, 2.4]} />
            </Target>
            <Target
              height={1.5}
              offset={[0, 1, 0]}
              chapter={Chapters[15]}
              position={Chapters[15].position}
              geometry="cylinder"
              geometryArgs={[3.2, 3.2, 5, 8]}
              transparent
              priceOffsetPosition={[-2.8, 0, 3.7]}
            >
              <Lighthouse scale={5} />
            </Target>
            <Target
              chapter={Chapters[12]}
              position={Chapters[12].position}
              geometryArgs={[0.5, 0.5, 1, 8]}
              transparent
              height={2.5}
              priceOffsetPosition={[0.5, -1.25, 0]}
              priceElevation={1}
            />
            <Megaphone
              rotation={[0, 0, 0.3]}
              scale={[0.2, 0.2, 0.2]}
              position={Chapters[12].position}
            />
            <Target
              chapter={Chapters[11]}
              position={Chapters[11].position}
              geometryArgs={[2, 2, 3, 8]}
              transparent
            >
              <BigTree rotation={[0, -2, 0]} scale={[4, 4, 4]} />
            </Target>
            <Target chapter={Chapters[14]} position={Chapters[14].position}>
              <Ufo scale={[0.4, 0.4, 0.4]} />
            </Target>

            <TheDispatcher quest={Quests[1]} position={[29.33, 0.73, -8.92]}>
              <Character scale={0.1} rotation={[0, 1.8, 0]} />
            </TheDispatcher>

            <TheDispatcher quest={Quests[1]} position={[29.66, 0.73, -5.06]}>
              <Kirill scale={0.1} rotation={[0, 1.8, 0]} />
            </TheDispatcher>

            <TheDispatcher quest={Quests[1]} position={[33.92, 0.83, -2.65]}>
              <Daniele scale={0.1} rotation={[0, 1.8, 0]} />
            </TheDispatcher>

            <TheDispatcher quest={Quests[1]} position={[34.49, 0.83, 1.44]}>
              <Editor scale={0.1} rotation={[0, 1.8, 0]} />
            </TheDispatcher>

            <TheDispatcher quest={Quests[0]} position={[78.1, 1.26, -14.51]}>
              <Lumberjack scale={0.6} rotation={[0, 1.8, 0]} />
            </TheDispatcher>

            <Boundaries />
            <Sensor position={[-60.51, 26.97, -48.47]} />
          </Physics>
        </Canvas>
      </KeyboardControls>
    </div>
  )
}

export default World
