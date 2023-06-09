import { Suspense, lazy, useRef, useEffect } from 'react'
import { Box, KeyboardControls, Gltf, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import Landscape from './Landscape'
import Lights from './Lights'
import Forest from './Forest'
import SmallTree from './SmallTree'
import './World.css'
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
import Cinema from './Cinema'
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

const WorldDashboard = lazy(() => import('./WorldDashboard'))

const FarAwayCamera = {
  position: [111.8923846860428, 132.97427986352267, 100.68959842565253],
}

const CloseCamera = {
  position: [10, 13, 10],
}

const World = ({ width = 500, height = 800, debug = false, debugPhysics = false }) => {
  return (
    <div
      className="World"
      style={{ width, height, marginLeft: -width / 2, marginTop: -height / 2 }}
    >
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
          {debug && <WorldDashboard />}

          <Suspense>
            <Lights />
            <Clouds />
            <Airship position={[6, 16, 0]} />
            <Pound />
            <Ocean scale={[12, 12, 12]} position={[0, -1.6, 0]} />
            <Antenna rotation={[0, 0, 0]} scale={[2, 2, 2]} position={[-24.2, -1, -6.8]} />
            <SwedishHorse rotation={[0, -2, 0]} scale={2.2} position={[69.81, 12.3, 45.32]} />
            <Banjo
              rotation={[0, 0, -0.1]}
              scale={[0.2, 0.2, 0.2]}
              position={[17.83, 10.68, 79.68]}
            />
            <Megaphone
              rotation={[0, 0, 0.3]}
              scale={[0.3, 0.3, 0.3]}
              position={[51.73, 8.05, -37.96]}
            />
            <Ufo rotation={[0, 0, 0]} scale={[0.4, 0.4, 0.4]} position={[-76.9, 9.6, 22.5]} />
            <Kite rotation={[0, 0, 0]} scale={[1, 1, 1]} position={[2.06, -3.16, -30.67]} />
            <Balloon rotation={[0, 0, 0]} scale={[3, 3, 3]} position={[-24.3, 0.1, 47.6]} />
            <BigTree rotation={[0, -2, 0]} scale={[4, 4, 4]} position={[-54.4, -0.1, -19.6]} />
            <Arch rotation={[0, 0.3, 0]} scale={[2.4, 2.4, 2.4]} position={[-1.2, 13.5, -65.7]} />
            <Boat rotation={[0, 0, 0]} scale={[2.5, 2.5, 2.5]} position={[91.6, -0.8, -10.2]} />
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
            <Cinema rotation={[0, 0.2, 0]} scale={[3, 3, 3]} position={[-20, -0.7, 6]} />
            <Transmitter scale={[0.2, 0.2, 0.2]} position={[-71.9, 9.45, 65.5]} />
            <Flag rotation={[0, 2.7, 0]} scale={[0.21, 0.3, 0.21]} position={[60.04, 11.7, 72.7]} />
            <Flag rotation={[0, 2.7, 0]} scale={[0.21, 0.3, 0.21]} position={[-75.3, 10.0, 2.2]} />
            <Flag rotation={[0, 0, 0]} scale={[0.21, 0.21, 0.21]} position={[39.7, 13.1, -52.5]} />
            <ObservationTower scale={[0.1, 0.1, 0.1]} position={[-31.3, -0.3, 59.1]} />
            <Windsock rotation={[0, 0, 0]} scale={0.4} position={[5.1, 8.8, 66]} />
            <GroundViewSign
              rotation={[0, 0, 0]}
              scale={1}
              position={[7.74, 0.36, 17.45]}
              color={'#A25FFF'}
            />
            <BirdEyeViewSign
              rotation={[0, 0, 0]}
              scale={1}
              position={[7.74, 0.36, 15.45]}
              color={'#A25FFF'}
            />
            <OverheadViewSign
              rotation={[0, 0, 0]}
              scale={1}
              position={[7.74, 0.36, 13.45]}
              color={'#A25FFF'}
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
            <House
              rotation={[0, 0 - 2.2, 0]}
              scale={[5.5, 5.5, 5.5]}
              position={[-32, -0.8, -18.4]}
            />
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
              <Player debug={debug} position={[94.88, 0.26, -14.2]}></Player>
              <Landscape receiveShadow position={[0, -2, 0]} scale={10} debug={debug} />
              <Forest positions={BigTrees.positions} scales={BigTrees.scales} maxScale={1.5}>
                <FirTree />
              </Forest>
              <Forest positions={SmallTrees.positions} scales={SmallTrees.scales} maxScale={0.7}>
                <FirTreeSmall />
              </Forest>

              <Target chapter={Chapters[0]} position={[-60, 27, -58]}>
                <Windmill scale={0.3} rotation={[0, 1, 0]} />
              </Target>
              <Target
                radius={4}
                height={1.5}
                offset={[0, 1, 0]}
                chapter={Chapters[15]}
                position={Chapters[15].position}
                placeHolderOffsetPosition={[-2.8, 3, 3.7]}
              >
                <Lighthouse scale={5} />
              </Target>
              <TheDispatcher quest={Quests[0]} position={[-2.02, 0.27, 22.59]}>
                <Lumberjack scale={0.6} rotation={[0, 1.8, 0]} />
              </TheDispatcher>
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  )
}

export default World
