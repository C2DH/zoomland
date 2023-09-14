import { RigidBody } from '@react-three/rapier'
import { usePlayerStore } from '../store'
// import { useSpring, config } from '@react-spring/web'
import { useRef } from 'react'

const TheDispatcher = ({ quest, position, children, debug = false }) => {
  const dispatcherRef = useRef()

  const [collectQuest, doneCollectingQuest] = usePlayerStore((state) => [
    state.collectQuest,
    state.doneCollectingQuest,
  ])
  const collisionEnterHandler = (e) => {
    console.debug('[Dispatcher] @collisionEnterHandler', e.rigidBodyObject.name)
    if (e.rigidBodyObject.name === 'player') {
      console.log('[Dispatcher] collisionEnterHandler', e.rigidBodyObject.name, quest.id, quest)
      collectQuest(quest)
      // rotate towards player
      // const target = e.rigidBodyObject.position
      // const dispatcher = dispatcherRef.current
      // const dispatcherPosition = dispatcher.position
      // const dx = target.x - dispatcherPosition.x
      // const dz = target.z - dispatcherPosition.z
      // const angle = Math.atan2(dz, dx)
      // dispatcher.rotation.y = angle
      // api.start({
      //   scale: 1.5,
      // })
    }
  }
  const collisionExitHandler = (e) => {
    if (e.rigidBodyObject.name === 'player') {
      console.log('[Dispatcher] collisionExitHandler', e.rigidBodyObject.name)
      doneCollectingQuest(quest)
      // api.start({
      //   scale: 0.5,
      // })
    }
  }
  // const pricePosition = [position[0], position[1], position[2]]
  return (
    <group ref={dispatcherRef} position={position}>
      <RigidBody
        colliders="cuboid"
        type={'fixed'}
        onCollisionEnter={collisionEnterHandler}
        onCollisionExit={collisionExitHandler}
      >
        <mesh>
          <cylinderGeometry args={[1, 1, 5, 32]} />
          <meshStandardMaterial color={'blue'} transparent={true} opacity={0} />
        </mesh>
      </RigidBody>
      {children}
      {debug && (
        <mesh>
          <cylinderGeometry args={[0.75, 0.75, 0.2, 32]} />
          <meshStandardMaterial color={'red'} />
        </mesh>
      )}
    </group>
  )
}

export default TheDispatcher
