import { Box, KeyboardControls, Gltf } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import { Suspense } from 'react'
import Player from './Player'
import Landscape from './Landscape'
import Lights from './Lights'
import Egg from './Egg'
import BigTree from './BigTree'

const World = ({ width = 500, height = 800 }) => {
  return (
    <div
      className="World"
      style={{ width, height, margin: 'auto', border: '1px solid', backgroundColor: 'pink' }}
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
        <Canvas>
          <Suspense>
            <Lights />
            <Physics>
              <RigidBody position={[0, 6, 0]} rotation={[0.5, -0.9, 0.2]} colliders="hull">
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
              <Player> </Player>
              <Landscape position={[0, -1, 0]} scale={10} fixed />
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  )
}

export default World
