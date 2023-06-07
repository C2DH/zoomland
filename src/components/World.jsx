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
import { default as BigTrees } from '../data/SmallTrees'
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
            <SwedishHorse rotation={[0, 1, 0]} scale={[2, 2, 2]} position={[53.5, 11.3, 24.4]} />
            <Banjo rotation={[0, 0, -0.1]} scale={[0.2, 0.2, 0.2]} position={[6.5, 6, 11.6]} />
            <Megaphone rotation={[0, 0, 0.3]} scale={[0.3, 0.3, 0.3]} position={[8, 8, 11.6]} />
            <Ufo rotation={[0, 0, 0]} scale={[0.4, 0.4, 0.4]} position={[-76.9, 9.6, 22.5]} />
            <Kite rotation={[0, 0, 0]} scale={[1, 1, 1]} position={[-4.6, 0.2, 54.8]} />
            <Balloon rotation={[0, 0, 0]} scale={[3, 3, 3]} position={[-24.3, 0.1, 47.6]} />
            <BigTree rotation={[0, -2, 0]} scale={[4, 4, 4]} position={[-54.4, -0.1, -19.6]} />
            <Arch rotation={[0, 0.3, 0]} scale={[2.2, 2.2, 2.2]} position={[-1.2, 13.5, -65.7]} />
            <Boat rotation={[0, 0, 0]} scale={[2.5, 2.5, 2.5]} position={[91.6, -0.8, -10.2]} />
            <FishNet rotation={[0, -2.2, 0]} scale={[2.5, 2.5, 2.5]} position={[2.2, -2.8, -30]} />
            <StoneBig rotation={[0, 1, 0]} scale={[1.5, 1.5, 1.5]} position={[0.4, 14.2, -72.6]} />
            <StoneBig rotation={[0, 0, 0]} scale={[3, 3, 3]} position={[-34.0, 0.3, 31.8]} />
            <StoneBig rotation={[0, 0, 0]} scale={[2, 1.5, 2]} position={[4.8, 12.6, -58.4]} />
            <StoneBig rotation={[1, 1.5, 1]} scale={[2.5, 1.5, 2]} position={[11.2, 12.5, -70.1]} />
            <Cinema rotation={[0, 0.2, 0]} scale={[3, 3, 3]} position={[-20, -0.7, 6]} />
            <Transmitter scale={[0.2, 0.2, 0.2]} position={[-71.9, 9.45, 65.5]} />
            <Flag rotation={[0, 2.7, 0]} scale={[0.21, 0.21, 0.21]} position={[16.1, 10.2, 75.2]} />
            <Flag rotation={[0, 2.7, 0]} scale={[0.21, 0.21, 0.21]} position={[-75.3, 10.0, 2.2]} />
            <Flag
              rotation={[0, 2.7, 0]}
              scale={[0.21, 0.21, 0.21]}
              position={[39.7, 13.1, -52.5]}
            />
            <ObservationTower scale={[0.1, 0.1, 0.1]} position={[-31.3, -0.3, 59.1]} />
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
              color={'#E7DF29'}
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
            <Physics debug={debugPhysics}>
              <RigidBody position={[6, 6, 0]} rotation={[0.5, -0.9, 0.2]} colliders="hull">
                <Gltf
                  castShadow
                  src="https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/ice-cream-truck/model.gltf"
                />
              </RigidBody>
              {/* <Placeholder /> */}
              {/* <BigTree position={[-18, -1.1, -4]} scale={2}></BigTree> */}
              {/* <BigTree position={[-18, -1.1, -4]} scale={2}></BigTree> */}
              <Player debug={debug} position={[94.88, 0.26, -14.2]}></Player>
              <Landscape receiveShadow position={[0, -2, 0]} scale={10} debug={debug} />
              <Forest positions={BigTrees.positions} scales={BigTrees.scales} maxScale={1.5}>
                <FirTree />
              </Forest>
              <Forest positions={SmallTrees.positions} scales={SmallTrees.scales} maxScale={1.2}>
                <FirTreeSmall />
              </Forest>

              <Target chapter={Chapters[0]} position={[-60, 27, -58]}>
                <Windmill scale={0.3} rotation={[0, 1, 0]} />
              </Target>
              <Target
                radius={4}
                height={0.5}
                offset={[0, 1, 0]}
                chapter={Chapters[15]}
                position={[54, 20.4, -85]}
                placeHolderOffsetPosition={[-2.8, 3, 3.7]}
              >
                <Lighthouse scale={5} />
              </Target>
              <TheDispatcher quest={Quests[0]} position={[-5, -0.5, 7]}>
                <Lumberjack scale={0.6} />
              </TheDispatcher>
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  )
}

export default World
