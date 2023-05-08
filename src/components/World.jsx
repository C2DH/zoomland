import { Suspense, lazy, useRef, useEffect } from 'react'
import { Box, KeyboardControls, Gltf, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import Landscape from './Landscape'
import Lights from './Lights'
import Placeholder from './Placeholder'
import Forest from './Forest'
// import BigTree from './BigTree'
import './World.css'
const WorldDashboard = lazy(() => import('./WorldDashboard'))
const FarAwayCamera = {
  position: [111.8923846860428, 132.97427986352267, 100.68959842565253],
}

const CloseCamera = {
  position: [10, 13, 10],
}

const World = ({ width = 500, height = 800, debug = true, debugPhysics = false }) => {
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
        ]}
      >
        <Canvas camera={CloseCamera}>
          {debug && <WorldDashboard />}

          <Suspense>
            <Lights />
            <Physics debug={debugPhysics}>
              <RigidBody position={[6, 6, 0]} rotation={[0.5, -0.9, 0.2]} colliders="hull">
                <Gltf
                  castShadow
                  src="https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/ice-cream-truck/model.gltf"
                />
              </RigidBody>
              <Placeholder />
              {/* <BigTree position={[-18, -1.1, -4]} scale={2}></BigTree>
              <Player debug={debug}> </Player> */}
              <Landscape receiveShadow position={[0, -2, 0]} scale={10} debug={debug} />
              <Forest />
            </Physics>

            {debug && <OrbitControls />}
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  )
}

export default World
