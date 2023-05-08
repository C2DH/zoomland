import { Box, KeyboardControls, Gltf, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import { Suspense } from 'react'
import Player from './Player'
import Landscape from './Landscape'
import Lights from './Lights'
import SmallTree from './SmallTree'
import BigTree from './BigTree'
import './World.css'

const FarAwayCamera = {
  position: [111.8923846860428, 132.97427986352267, 100.68959842565253],
}

const World = ({ width = 500, height = 800, debug = true }) => {
  return (
    <div className="World" style={{ width, height, margin: 'auto' }}>
      <KeyboardControls
        map={[
          { keys: ['KeyW', 'ArrowUp'], name: 'moveForward' },
          { keys: ['KeyS', 'ArrowDown'], name: 'moveBackward' },
          { keys: ['KeyA', 'ArrowLeft'], name: 'moveLeft' },
          { keys: ['KeyD', 'ArrowRight'], name: 'moveRight' },
          { keys: ['Space', 'KeyJ'], name: 'jump' },
        ]}
      >
        <Canvas camera={FarAwayCamera}>
          <Suspense>
            <Lights />
            <Physics>
              <RigidBody position={[6, 6, 0]} rotation={[0.5, -0.9, 0.2]} colliders="hull">
                <Gltf src="https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/ice-cream-truck/model.gltf" />
              </RigidBody>
              {/* <RigidBody colliders={'hull'} restitution={0.5}>
                <mesh>
                  <boxBufferGeometry />
                  <meshStandardMaterial />
                </mesh>
              </RigidBody>
              <RigidBody colliders={'hull'} restitution={0.5}>
                <mesh>
                  <boxBufferGeometry />
                  <meshStandardMaterial />
                </mesh>
              </RigidBody> */}

              <BigTree position={[-18, -1.1, -4]} scale={2}></BigTree>
              <SmallTree position={[-3, 0.4, 0]} scale={(1, 1, 1)}></SmallTree>
              <Player debug={debug}> </Player>
              <Landscape position={[0, -1, 0]} scale={10} debug={debug} />
            </Physics>
            {debug && <OrbitControls />}
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  )
}

export default World
