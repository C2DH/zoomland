import { Suspense, lazy } from 'react'
import { KeyboardControls, Environment } from '@react-three/drei'
// import { Glitch, EffectComposer } from '@react-three/postprocessing'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import Landscape from './Landscape'
import Lights from './Lights'
import Forest from './Forest'
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
import Pound from './Pound'
import Ocean from './Ocean'
import Windmill from './Windmill'
import Lighttower from './Lighttower'
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
import Boundaries from './Boundaries'
import Rig from './Rig'
import Grass from './Grass'
import Waves from './Waves'
import Editor from './Editor'
import Daniele from './Daniele'
import Kirill from './Kirill'
import Lars from './Lars'
import Sensor from './Sensor'
import Mushrooms from './Mushroom'
import Prize from './Prize'
import Butterflies from './butterflies'
import { useWindowStore } from '../store'
import Florentina from './Florentina'

const QuestsById = Quests.reduce((acc, quest) => {
  acc[quest.id] = quest
  return acc
}, {})

const Joystick = lazy(() => import('./Joystick'))
const WorldDashboard = lazy(() => import('./WorldDashboard'))
const Sounds = lazy(() => import('./Sounds'))

const CloseCamera = {
  position: [10, 13, 10],
}

const World = ({
  isMobile = false,
  // width = 500,
  // height = 800,
  debug = false,
  debugPhysics = false,
  enableSounds = true,
}) => {
  console.debug('[World] render')

  const [width, height] = useWindowStore((state) => [state.width, state.height])

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
              files={`${import.meta.env.BASE_URL || '/'}evening_road_01_puresky_1k.hdr`}
              near={1}
              far={1000}
              background
              blur={0.12}
              inte
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
            <Flag rotation={[0, 2.7, 0]} scale={[0.21, 0.3, 0.21]} position={[-75.3, 9.8, 2.2]} />
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
              <TheDispatcher
                quest={QuestsById.Daniele}
                rotation={[0, 1.8, 0]}
                position={[61.1, 11.02, -16.51]}
              >
                <Daniele scale={0.065} />
              </TheDispatcher>
              <TheDispatcher
                quest={QuestsById.FlorentinaArmaselu}
                rotation={[0, 2.4, 0]}
                position={[81, 1, -11.57]}
              >
                <Florentina scale={1.2} />
              </TheDispatcher>
              <TheDispatcher
                quest={QuestsById.AndreasFickers}
                rotation={[0, 0.8, 0]}
                position={[80.22, 1.05, -17.21]}
              >
                <Lumberjack scale={0.4} />
              </TheDispatcher>
              <TheDispatcher
                quest={QuestsById.LarsWieneke}
                rotation={[0, 0, 0]}
                position={[46.87, 20.95, -81.69]}
              >
                <Lars scale={0.1} />
              </TheDispatcher>
              <TheDispatcher
                quest={QuestsById.KirillMitsurov}
                rotation={[0, 1.8, 0]}
                position={[6.95, 8.85, 60.91]}
              >
                <Kirill scale={0.1} />
              </TheDispatcher>
              <TheDispatcher
                quest={QuestsById.VerenaDeutsch}
                rotation={[0, 3, 0]}
                position={[30.48, 0.73, -1.56]}
              >
                <Editor scale={0.1} />
              </TheDispatcher>

              {/* Boat or harbor - Introduction */}
              <Prize {...Chapters[0]} position={Chapters[0].position} />

              {/* Zepplin */}
              <Prize {...Chapters[1]} position={Chapters[1].position} />

              <Prize prizeOffsetPosition={[1.5, 0, 1.5]} {...Chapters[2]} />
              <Balloon
                yMax={30}
                rotation={[0, 0, 0]}
                scale={[3, 3, 3]}
                position={Chapters[2].position}
              />

              <Prize {...Chapters[3]} prizeOffsetPosition={[3, 0.5, 3]} />
              <Windmill
                scale={0.3}
                rotation={[0, 1, 0]}
                position={Chapters[3].position}
                debug={false}
              />

              <Prize {...Chapters[4]} prizeOffsetPosition={[0, 12.5, -1]} />
              <Banjo
                scale={0.15}
                rotation={[0, 1, 0]}
                position={Chapters[4].position}
                debug={false}
              />
              <Prize {...Chapters[5]} prizeOffsetPosition={[2.5, 0, 0]} />
              <Umbrella
                rotation={[-0.1, 0, -0.2]}
                scale={[1.6, 1.6, 1.6]}
                color={'#E56C1A'}
                position={Chapters[5].position}
              />
              <Prize {...Chapters[6]} prizeOffsetPosition={[0, 0.5, 0]} />
              <Antenna
                debug={false}
                rotation={[0, 0, 0]}
                scale={[2, 2, 2]}
                position={Chapters[6].position}
              />

              <Prize {...Chapters[7]} prizeOffsetPosition={[1, 0.5, -3]} />
              <Transmitter scale={[0.2, 0.2, 0.2]} position={Chapters[7].position} debug={false} />

              <Prize {...Chapters[8]} prizeOffsetPosition={[1, 0.5, -2]} />
              <SwedishHorse
                rotation={[0, -2, 0]}
                scale={1.2}
                position={Chapters[8].position}
                debug={false}
              />

              <Prize {...Chapters[9]} prizeOffsetPosition={[3, 0.5, 2]} />
              <Arch
                rotation={[0, 0.3, 0]}
                scale={[2.4, 2.4, 2.4]}
                position={Chapters[9].position}
                debug={false}
              />

              <Prize {...Chapters[10]} prizeOffsetPosition={[8, 0.5, 0 - 2]} />
              <Theater
                rotation={[0, 0.2, 0]}
                scale={[3, 3, 3]}
                position={Chapters[10].position}
                debug={false}
              />

              <Prize {...Chapters[11]} prizeOffsetPosition={[3, 0.5, -2]} />
              <BigTree
                rotation={[0, -2, 0]}
                scale={[4, 4, 4]}
                position={Chapters[11].position}
                debug={false}
              />

              <Prize {...Chapters[12]} prizeOffsetPosition={[1, 0.5, 1]} />
              <Megaphone
                rotation={[0, 0, 0.3]}
                scale={[0.2, 0.2, 0.2]}
                position={Chapters[12].position}
                debug={false}
              />

              <Prize {...Chapters[13]} prizeOffsetPosition={[0, 2, 4]} />
              <FishNet
                rotation={[0, -2.2, 0]}
                scale={[2.5, 2.5, 2.5]}
                position={Chapters[13].position}
                debug={true}
              />

              <Prize {...Chapters[14]} prizeOffsetPosition={[5, 0.5, 0]} />
              <Ufo scale={[0.4, 0.4, 0.4]} position={Chapters[14].position} debug={false} />

              <Prize {...Chapters[15]} prizeOffsetPosition={[-3, 0.5, 6]} />
              <Lighttower scale={5} position={Chapters[15].position} debug={false} />

              <Prize {...Chapters[16]} prizeOffsetPosition={[2, 0.5, 0]} />
              <Windsock
                rotation={[0, 0, 0]}
                scale={0.4}
                position={Chapters[16].position}
                debug={false}
              />
              <IcescreamTruck rotation={[0, 1.3, 0]} scale={1.5} position={[-8.7, 0.03, 33.23]} />
              <ObservationTower scale={[0.1, 0.1, 0.1]} position={[-29.01, -0.05, 53.74]} />
              <ObservationTower
                scale={[0.15, 0.15, 0.15]}
                position={[79.4, 10.5, 52.2]}
                rotation={[0, 1, 0]}
              />
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
              <House rotation={[0, -2, 0]} scale={[5.5, 5.5, 5.5]} position={[-10, 0, 46]} />
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
              <Player isMobile={isMobile} debug={debug}></Player>

              <Boundaries />
              <Sensor height={20} width={20} position={[-60.51, 26.97, -48.47]} />
            </Physics>
          </Canvas>
        </KeyboardControls>
      </div>
    </>
  )
}

export default World
