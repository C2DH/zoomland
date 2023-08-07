import { Suspense, lazy } from 'react'
import { KeyboardControls, Environment, Stats, Float } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import Landscape from './Landscape'
import Lights from './Lights'
import Forest from './Forest'
import SmallTree from './SmallTree'
import './World.css'
import '../index.css'
import Player from './Player'
import Chapters from '../data/chapters.json'
import Quests from '../data/quests.json'
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
import Mushrooms from './Mushroom'
import Price from './Price'
import Butterflies from './butterflies'
import { ViewTypeOverhead } from '../constants'
// import { AnimationStoreLoader } from '../store/animations'

const QuestsById = Quests.reduce((acc, quest) => {
  acc[quest.id] = quest
  return acc
}, {})

const Joystick = lazy(() => import('./Joystick'))
const WorldDashboard = lazy(() => import('./WorldDashboard'))
const Sounds = lazy(() => import('./Sounds'))
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
  enableSounds = true,
}) => {
  console.debug('[World] render')
  return (
    <>
      {enableSounds && (
        <Suspense fallback={null}>
          <Sounds />
        </Suspense>
      )}
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
              files="/evening_road_01_puresky_1k.hdr"
              near={1}
              far={1000}
              // background
              blur={0.08}
            />
            <fog attach="fog" color="#E0DCCF" near={20} far={250} />
            {debug && <WorldDashboard />}
            <Lights />
            <Clouds />
            <Butterflies />
            <Mushrooms position={[0, -2, 0]} scale={10} />
            <Grass position={[0, -2.1, 0]} scale={10} />
            <Waves position={[0, -2, 0]} scale={10} />
            <Airship position={[6, 16, 0]} />
            <Pound />
            <Ocean scale={[12, 12, 12]} position={[0, -2.2, 0]} />
            <Kite rotation={[0, 0, 0]} scale={[1, 1, 1]} position={[2.06, -3.16, -30.67]} />
            <Flag rotation={[0, 2.7, 0]} scale={[0.21, 0.3, 0.21]} position={[60.04, 11.7, 72.7]} />
            <Flag rotation={[0, 2.7, 0]} scale={[0.21, 0.3, 0.21]} position={[-75.3, 10.0, 2.2]} />
            <Flag rotation={[0, 0, 0]} scale={[0.21, 0.21, 0.21]} position={[39.7, 13.1, -52.5]} />

            {/* //Pick color - Media #fa953b, History - #306fc5, Hermeneutics - #9e43c8, Digital landscapes - #ed407d, Intro - #7c7c7c */}

            <Umbrella
              rotation={[-0.2, 0, 0.2]}
              scale={[1.5, 1.5, 1.5]}
              position={[-26.3, -0.7, 63.1]}
              color={'#E7DF29'}
            />

            <Umbrella
              rotation={[-0.7, 0, -0.4]}
              scale={[1.5, 1.5, 1.5]}
              position={[-13.1, -1, 64.4]}
              color={'#E7DF29'}
            />

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

            <WindTurbine
              scale={[0.25, 0.25, 0.25]}
              position={[92.85, 7.1, 29.54]}
              rotation={[0, -0.9, 0]}
              rotationSpeed={0.3}
            />
            <Physics debug={debugPhysics}>
              {/* Boat or harbor */}
              <Price {...Chapters[0]} />

              {/* Zepplin */}
              <Price {...Chapters[1]} />
              <Price {...Chapters[1]} position={[-75.48, 9.91, 2.78]} />

              <TheDispatcher quest={QuestsById.Daniele} position={[61.1, 11.02, -16.51]}>
                <Daniele scale={0.065} rotation={[0, 1.8, 0]} />
              </TheDispatcher>

              <TheDispatcher
                quest={QuestsById.FlorentinaArmaselu}
                position={[-51.48, 27.01, -51.3]}
              >
                <Editor scale={0.1} rotation={[0, 3, 0]} />
              </TheDispatcher>

              <TheDispatcher quest={QuestsById.AndreasFickers} position={[78.1, 1.26, -14.51]}>
                <Lumberjack scale={0.45} rotation={[0, 1.8, 0]} />
              </TheDispatcher>
              <Price priceOffsetPosition={[1.5, 0, 1.5]} {...Chapters[2]} />
              <Balloon
                yMax={30}
                rotation={[0, 0, 0]}
                scale={[3, 3, 3]}
                position={Chapters[2].position}
              />

              {/* chapter 3 */}
              <Windmill scale={0.3} rotation={[0, 1, 0]} position={[-60, 27, -58]} />
              <Price {...Chapters[3]} />

              {/* <Target
                chapter={Chapters[3]}
                position={Chapters[3].position}
                priceOffsetPosition={[4, 0, 3]}
                priceElevation={0}
                PriceComponent={OverheadViewSign}
                geometry="cylinder"
                geometryArgs={[3.2, 3.2, 5, 8]}
                additionalGeometry="box"
                additionalGeometryArgs={[3.54, 4, 2]}
                additionalGeometryRotation={[0, 1, 0]}
                additionalGeometryOffsetPosition={[2.5, 0, 1.5]}
                transparent
              >
                <Windmill scale={0.3} rotation={[0, 1, 0]} />
              </Target> */}

              <Target
                chapter={Chapters[4]}
                position={Chapters[4].position}
                PriceComponent={GroundViewSign}
                priceComponentColor="#306fc5"
                geometryArgs={[0.5, 0.5, 1, 8]}
                priceOffsetPosition={[-1.2, 10, 0]}
                height={30}
                priceElevation={2}
                transparent
              >
                <Banjo scale={0.15} rotation={[0, 1, 0]} />
              </Target>

              <Target
                chapter={Chapters[5]}
                position={Chapters[5].position}
                priceOffsetPosition={[1, -1, 0]}
                priceElevation={0}
                PriceComponent={OverheadViewSign}
                priceComponentColor="#fa953b"
                transparent
              >
                <Umbrella rotation={[-0.1, 0, -0.2]} scale={[1.6, 1.6, 1.6]} color={'#E56C1A'} />
              </Target>

              <Target
                chapter={Chapters[6]}
                position={Chapters[6].position}
                priceOffsetPosition={[0, 0, 0]}
                priceElevation={0}
                PriceComponent={OverheadViewSign}
                priceComponentColor="#fa953b"
                height={3}
                geometry="box"
                geometryArgs={[0.5, 6, 0.5]}
                geometryPosition={[2.1, 0, 2.1]}
                additionalGeometry="box"
                additionalGeometryArgs={[0.5, 6, 0.5]}
                additionalGeometryOffsetPosition={[2.1, 0, -2.1]}
                transparent
              >
                <Antenna rotation={[0, 0, 0]} scale={[2, 2, 2]} />
              </Target>

              <Target
                chapter={Chapters[7]}
                position={Chapters[7].position}
                priceOffsetPosition={[1, -0.5, -3]}
                priceElevation={0}
                PriceComponent={GroundViewSign}
                priceComponentColor="#fa953b"
                height={2}
                geometryArgs={[0.9, 0.9, 5, 8]}
                transparent
              >
                <Transmitter scale={[0.2, 0.2, 0.2]} />
              </Target>

              <Target
                chapter={Chapters[8]}
                position={Chapters[8].position}
                priceOffsetPosition={[1, -0.5, -3]}
                priceElevation={0}
                PriceComponent={GroundViewSign}
                priceComponentColor="#fa953b"
                height={1}
                geometry="box"
                geometryArgs={[1.4, 6, 0.6]}
                geometryPosition={[0.4, 0, -1]}
                geometryRotation={[0, -0.45, 0]}
                additionalGeometry="box"
                additionalGeometryArgs={[1.4, 6, 0.8]}
                additionalGeometryOffsetPosition={[-1.0, 0, 2.1]}
                additionalGeometryRotation={[0, -0.5, 0]}
                transparent
              >
                <SwedishHorse rotation={[0, -2, 0]} scale={2.2} />
              </Target>

              <Target
                chapter={Chapters[9]}
                position={Chapters[9].position}
                priceOffsetPosition={[4, -0.5, 1.5]}
                priceElevation={0}
                PriceComponent={OverheadViewSign}
                priceComponentColor="#9e43c8"
                geometry="box"
                geometryArgs={[1.8, 6, 1.8]}
                geometryPosition={[-1, 0, -2.7]}
                geometryRotation={[0, 0.3, 0]}
                additionalGeometry="box"
                additionalGeometryArgs={[2, 6, 2.2]}
                additionalGeometryRotation={[0, 0.2, 0]}
                additionalGeometryOffsetPosition={[0.5, 0, 2.2]}
                transparent
                height={1}
              >
                <Arch rotation={[0, 0.3, 0]} scale={[2.4, 2.4, 2.4]} />
              </Target>

              <Target
                chapter={Chapters[10]}
                position={Chapters[10].position}
                priceOffsetPosition={[8, -0.5, -1.6]}
                priceElevation={0}
                PriceComponent={OverheadViewSign}
                priceComponentColor="#9e43c8"
                geometry="box"
                geometryArgs={[14, 3.2, 8]}
                geometryPosition={[0, 0, 0]}
                geometryRotation={[0, 0.2, 0]}
                transparent
              >
                <Theater rotation={[0, 0.2, 0]} scale={[3, 3, 3]} />
              </Target>

              <Target
                chapter={Chapters[11]}
                position={Chapters[11].position}
                PriceComponent={OverheadViewSign}
                priceComponentColor="#9e43c8"
                priceOffsetPosition={[3, -0.5, 0]}
                priceElevation={0}
                height={2.5}
                geometryArgs={[2, 2, 3, 8]}
                transparent
              >
                <BigTree rotation={[0, -2, 0]} scale={[4, 4, 4]} />
              </Target>

              <Target
                chapter={Chapters[12]}
                position={Chapters[12].position}
                PriceComponent={GroundViewSign}
                priceComponentColor="#9e43c8"
                priceOffsetPosition={[0.5, -1.25, 0]}
                priceElevation={1}
                height={2.5}
                geometryArgs={[0.5, 0.5, 1, 8]}
                transparent
              >
                <Megaphone rotation={[0, 0, 0.3]} scale={[0.2, 0.2, 0.2]} />
              </Target>

              <Target
                chapter={Chapters[13]}
                position={Chapters[13].position}
                height={2.5}
                priceOffsetPosition={[1, 1, 5.5]}
                priceElevation={1}
                PriceComponent={BirdEyeViewSign}
                priceComponentColor="#ed407d"
                transparent
              >
                <FishNet rotation={[0, -2.2, 0]} scale={[2.5, 2.5, 2.5]} />
              </Target>

              <Target
                chapter={Chapters[14]}
                position={Chapters[14].position}
                PriceComponent={BirdEyeViewSign}
                priceComponentColor="#ed407d"
                priceOffsetPosition={[3, -2, 0]}
                priceElevation={1}
                height={5}
                geometryArgs={[0.1, 0.1, 0.1, 3]}
                geometryPosition={[0, -1, 0]}
                transparent
              >
                <Ufo scale={[0.4, 0.4, 0.4]} />
              </Target>

              <Target
                chapter={Chapters[15]}
                position={Chapters[15].position}
                priceOffsetPosition={[0, -0.5, 4]}
                priceElevation={0}
                PriceComponent={OverheadViewSign}
                priceComponentColor="#ed407d"
                height={2}
                geometryArgs={[2.6, 2.36, 5, 8]}
                transparent
              >
                <Lighthouse scale={5} />
              </Target>

              {/* chapter 15 */}
              {/* <Lighthouse scale={5} position={[54, 20.4, -85]} />
                <Price {...Chapters[15]} /> */}
              {/* end of chqpter 15 */}

              <Target
                chapter={Chapters[16]}
                position={Chapters[16].position}
                priceOffsetPosition={[2, 0, 0]}
                priceElevation={0}
                PriceComponent={GroundViewSign}
                priceComponentColor="#ed407d"
                height={2}
                geometry="box"
                geometryArgs={[0.6, 6, 0.6]}
                geometryPosition={[0, 0, 0]}
                geometryRotation={[0, 0, 0]}
                transparent
              >
                <Windsock rotation={[0, 0, 0]} scale={0.4} />
              </Target>

              <IcescreamTruck rotation={[0, 1.3, 0]} scale={1.5} position={[-8.7, 0.03, 33.23]} />

              <ObservationTower scale={[0.1, 0.1, 0.1]} position={[-29.01, 0.07, 53.74]} />
              <Boat
                rotation={[0, 0, 0]}
                scale={[2.5, 2.5, 2.5]}
                positions={[
                  [123.6, -1.6, -10.2],
                  [91.6, -1.6, -10.2],
                ]}
              />

              <Landscape receiveShadow position={[0, -2, 0]} scale={10} debug={debug} />
              <Forest positions={BigTrees.positions} scales={BigTrees.scales} maxScale={1.5}>
                <FirTree />
              </Forest>
              <Forest positions={SmallTrees.positions} scales={SmallTrees.scales} maxScale={0.7}>
                <FirTreeSmall />
              </Forest>
              {/*House - next to Hill*/}
              <House
                rotation={[0, 1.5, 0]}
                scale={[5.5, 5.5, 5.5]}
                position={[45.2, 12.8, 56.68]}
              />

              {/*House - next to Beach*/}
              <House rotation={[0, -2, 0]} scale={[5.5, 5.5, 5.5]} position={[-10, -0.8, 46]} />

              {/*House - next to Theatre*/}
              <House
                rotation={[0, 0 - 2.2, 0]}
                scale={[5.5, 5.5, 5.5]}
                position={[-32, -0.8, -18.4]}
              />

              {/*House - next to Theatre*/}
              <House
                rotation={[0, 0 - 1.5, 0]}
                scale={[5.5, 5.5, 5.5]}
                position={[-12.0, -0.8, -24.4]}
              />

              <StoneBig
                rotation={[0, 1, 0]}
                scale={[1.5, 1.5, 1.5]}
                position={[0.4, 14.2, -72.6]}
              />
              <StoneBig rotation={[0, 0, 0]} scale={[3, 3, 3]} position={[-34.0, 0.3, 31.8]} />
              <StoneBig rotation={[0, 0, 0]} scale={[2, 1.5, 2]} position={[4.8, 12.6, -58.4]} />
              <StoneBig
                rotation={[1, 1.5, 1]}
                scale={[2.5, 1.5, 2]}
                position={[11.2, 12.5, -70.1]}
              />
              <StoneBig
                rotation={[1, 1.5, 1]}
                scale={[2.5, 1.5, 2]}
                position={[-33.3, 0.8, 33.56]}
              />
              <StoneBig rotation={[-0.5, 1.8, 1]} scale={[2.7, 2.9, 2.3]} position={[85, 7.2, 6]} />
              <StoneBig
                rotation={[-0.7, 1.9, 1.3]}
                scale={[2.5, 2.5, 2]}
                position={[16.45, 9.8, -50.67]}
              />

              <Player isMobile={isMobile} debug={debug} position={[94.88, 0.26, -14.2]}></Player>

              <TheDispatcher quest={Quests[5]} position={[46.87, 20.95, -81.69]}>
                <Character scale={0.1} rotation={[0, 0, 0]} />
              </TheDispatcher>

              <TheDispatcher quest={Quests[3]} position={[6.95, 8.85, 60.91]}>
                <Kirill scale={0.1} rotation={[0, 1.8, 0]} />
              </TheDispatcher>

              <TheDispatcher quest={Quests[2]} position={[61.1, 10.9, -16.51]}>
                <Daniele scale={0.1} rotation={[0, 1.8, 0]} />
              </TheDispatcher>

              <TheDispatcher quest={Quests[4]} position={[-51.48, 26.89, -51.3]}>
                <Editor scale={0.1} rotation={[0, 3, 0]} />
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
    </>
  )
}

export default World
