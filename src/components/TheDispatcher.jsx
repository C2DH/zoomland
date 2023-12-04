import { RigidBody } from '@react-three/rapier'
import { usePlayerStore } from '../store'
// import { useSpring, config } from '@react-spring/web'
import { useRef } from 'react'
import { Matrix4, Quaternion, Vector3 } from 'three'

const TheDispatcher = ({ quest, position, rotation, children, debug = false }) => {
  const dispatcherRef = useRef()

  const [collectQuest, doneCollectingQuest] = usePlayerStore((state) => [
    state.collectQuest,
    state.doneCollectingQuest,
  ])
  const collisionEnterHandler = (e) => {
    console.debug('[Dispatcher] @collisionEnterHandler', e.rigidBodyObject.name)
    if (e.rigidBodyObject.name === 'player') {
      console.debug('[Dispatcher] collisionEnterHandler', e.rigidBodyObject.name, quest.id, quest)
      collectQuest(quest)
      const A = e.rigidBodyObject.position
      const B = dispatcherRef.current.position
      //  Calculate the direction from B to A
      // const direction = new Vector3().subVectors(A, B).normalize()
      // Create a rotation matrix based on the direction
      const rotationMatrix = new Matrix4()
      rotationMatrix.lookAt(B, A, new Vector3(0, 1, 0)) // Assumes Y is the up direction
      // correct rotation by Math.PI / 2
      rotationMatrix.multiply(new Matrix4().makeRotationY(Math.PI / 2 + Math.PI / 3))
      // Extract the rotation as a quaternion from the rotation matrix
      const quaternion = new Quaternion()
      quaternion.setFromRotationMatrix(rotationMatrix)

      dispatcherRef.current.rotation.setFromQuaternion(quaternion)
      console.debug('[Dispatcher] quaternion', quaternion)
      // // rotate towards player
      // const dispatcher = dispatcherRef.current
      // const dispatcherPosition = dispatcher.position
      // const dx = target.x - dispatcherPosition.x
      // const dz = target.z - dispatcherPosition.z
      // const angle = Math.atan2(dz, dx) + Math.PI
      // dispatcher.rotation.y = angle
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
    <group ref={dispatcherRef} position={position} rotation={rotation}>
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
