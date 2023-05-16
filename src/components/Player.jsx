import Hero from './Hero'
import { Suspense, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import { OrbitControls, useKeyboardControls } from '@react-three/drei'
import { Quaternion, Vector3 } from 'three'
import {
  AnimationIdle,
  AnimationJump,
  AnimationRun,
  AnimationWalk,
  useAnimationStore,
} from '../store'

const JumpForce = 0.5

const Player = ({ debug = false, scale = 0.5, position = [2, 4, 2] }) => {
  const rigidbody = useRef()
  const orbitControls = useRef()
  const isOnFloor = useRef(false)
  const isOrbiting = useRef(false)
  const character = useRef()
  const [, getKeys] = useKeyboardControls()
  const setAnimation = useAnimationStore((state) => state.setAnimation)
  // const camera = useThree((state) => state.camera)
  const [smoothedCameraPosition] = useState(() => new Vector3())
  const [smoothedCameraTarget] = useState(() => new Vector3())

  useFrame((state, dt) => {
    const { moveForward, moveBackward, moveLeft, moveRight, jump } = getKeys()
    const impulse = { x: 0, y: 0, z: 0 }

    if (jump && isOnFloor.current) {
      impulse.y += JumpForce
      isOnFloor.current = false
      rigidbody.current.applyImpulse(impulse, true)
      setAnimation(AnimationJump)
    } else if (moveForward || moveBackward || moveLeft || moveRight) {
      setAnimation(AnimationWalk)
      if (moveForward) {
        impulse.z -= 2.5 * dt
      } else if (moveBackward) {
        impulse.z += 2.5 * dt
      } else if (moveLeft) {
        impulse.x -= 2.5 * dt
      } else if (moveRight) {
        impulse.x += 2.5 * dt
      }
      rigidbody.current.applyImpulse(impulse)
    } else {
      rigidbody.current.resetForces()
      setAnimation(AnimationIdle)
    }

    const bodyPosition = rigidbody.current.translation()
    const cameraPosition = new Vector3()
    cameraPosition.copy(bodyPosition)
    cameraPosition.y += 0.8
    cameraPosition.z += 1.5
    smoothedCameraPosition.lerp(cameraPosition, 0.1)

    const cameraTarget = new Vector3()
    cameraTarget.copy(bodyPosition)
    cameraTarget.y += 0.25
    cameraTarget.z -= 0.5
    smoothedCameraTarget.lerp(cameraTarget, 0.1)
    if (jump || moveForward || moveBackward || moveLeft || moveRight) {
      if (isOrbiting.current === false) {
        state.camera.position.copy(smoothedCameraPosition)
        // orbitControls.current.target = smoothedCameraTarget
      }
    }
    orbitControls.current.target = cameraTarget
  })

  // check if orbitControls control ended
  const lock = () => {
    isOrbiting.current = true
  }
  const unlock = () => {
    isOrbiting.current = false
  }

  return (
    <>
      <RigidBody
        ref={rigidbody}
        colliders={false}
        enabledRotations={[false, false, false]}
        onCollisionEnter={() => {
          isOnFloor.current = true
        }}
        position={position}
        scale={[scale, scale, scale]}
      >
        <CapsuleCollider args={[0.8, 0.4]} position={[0, 1.2, 0]} />
        <group ref={character}>
          <Suspense fallback={null}>
            <Hero></Hero>
          </Suspense>
        </group>
      </RigidBody>
      <OrbitControls onStart={lock} onEnd={unlock} ref={orbitControls} />
    </>
  )
}

export default Player
