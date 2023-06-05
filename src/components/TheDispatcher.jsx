import { RigidBody } from '@react-three/rapier'
import { usePlayerStore } from '../store'
import { useSpring, config } from '@react-spring/web'
import { useRef } from 'react'

const TheDispatcher = ({ quest, position, children }) => {
  // if vignette should be visible
  const price = useRef()
  const [props, api] = useSpring(() => ({
    scale: 0.5,
    // bounce
    config: config.wobbly,
    // },
    onChange: ({ value }) => {
      price.current.scale.set(value.scale, value.scale, value.scale)
    },
  }))

  const [collectQuest, doneCollectingQuest] = usePlayerStore((state) => [
    state.collectQuest,
    state.doneCollectingQuest,
  ])
  const collisionEnterHandler = (e) => {
    console.debug('[Dispatcher] @collisionEnterHandler', e.rigidBodyObject.name)
    if (e.rigidBodyObject.name === 'player') {
      console.log('[Dispatcher] collisionEnterHandler', e.rigidBodyObject.name)
      collectQuest(quest)
      api.start({
        scale: 1.5,
      })
    }
  }
  const collisionExitHandler = (e) => {
    if (e.rigidBodyObject.name === 'player') {
      console.log('[Dispatcher] collisionExitHandler', e.rigidBodyObject.name)
      doneCollectingQuest(quest)
      api.start({
        scale: 0.5,
      })
    }
  }
  const pricePosition = [position[0], position[1], position[2]]
  return (
    <group position={position}>
      <RigidBody
        colliders="cuboid"
        type={'fixed'}
        onCollisionEnter={collisionEnterHandler}
        onCollisionExit={collisionExitHandler}
      >
        <mesh>
          <cylinderBufferGeometry args={[1, 1, 5, 32]} />{' '}
          {/* Replace boxBufferGeometry with CylinderBufferGeometry */}
          <meshStandardMaterial color={'blue'} transparent={true} opacity={0} />
        </mesh>
      </RigidBody>
      {children}
      <mesh>
        <cylinderBufferGeometry args={[0.75, 0.75, 0.2, 32]} />{' '}
        <meshStandardMaterial color={'red'} />
      </mesh>
      <group ref={price} scale={0.5} position={pricePosition}>
        <mesh castShadow receiveShadow>
          <boxBufferGeometry />
          <meshStandardMaterial color={'pink'} />
        </mesh>
      </group>
    </group>
  )
}

export default TheDispatcher
