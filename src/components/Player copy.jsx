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
const Speed = 0.1
const MaxWalkingVelocity = 0.5
const MaxVelocity = 2
let walkDirection = new Vector3()
const rotateAngle = new Vector3(0, 1, 0)
let rotateQuaternion = new Quaternion()
const cameraTarget = new Vector3()

const getDirectionOffset = ({ moveForward, moveBackward, moveLeft, moveRight }) => {
  let directionOffset = 0
  if (moveForward) {
    if (moveLeft) {
      directionOffset = Math.PI / 4
    } else if (moveRight) {
      directionOffset = -Math.PI / 4
    }
  } else if (moveBackward) {
    if (moveLeft) {
      directionOffset = Math.PI / 4 + Math.PI / 2
    } else if (moveRight) {
      directionOffset = -Math.PI / 4 - Math.PI / 2
    } else {
      directionOffset = Math.PI
    }
  } else if (moveLeft) {
    directionOffset = Math.PI / 2
  } else if (moveRight) {
    directionOffset = -Math.PI / 2
  }
  return directionOffset
}
let bodyPosition

const Player = ({ debug = false, scale = 0.5 }) => {
  const rigidbody = useRef()
  const orbitControls = useRef()
  const isOnFloor = useRef(false)
  const character = useRef()
  const [, getKeys] = useKeyboardControls()
  const setAnimation = useAnimationStore((state) => state.setAnimation)
  // const camera = useThree((state) => state.camera)
  const [smoothedCamerPosition] = useState(() => new Vector3())
  const [smoothedCameraTarget] = useState(() => new Vector3())

  useFrame((state, dt) => {
    const { moveForward, moveBackward, moveLeft, moveRight, jump } = getKeys()

    if (moveBackward || moveForward || moveLeft || moveRight || jump) {
      console.debug('[Player] move', { moveForward, moveBackward, moveLeft, moveRight, jump })
    } else {
      setAnimation(AnimationIdle)
    }

    if (jump && isOnFloor.current) {
      const impulse = { x: 0, y: JumpForce, z: 0 }
      impulse.y += JumpForce
      isOnFloor.current = false
      rigidbody.current.applyImpulse(impulse, true)
      setAnimation(AnimationJump)
    }
    if (!isOnFloor.current) {
      return
    }
    if (moveForward || moveBackward || moveLeft || moveRight) {
      bodyPosition = rigidbody.current.translation()
      setAnimation(AnimationWalk)
    }

    // caclulate angle towards camera direction
    let angleYCameraDirection = Math.atan2(
      state.camera.position.x - bodyPosition.x,
      state.camera.position.z - bodyPosition.z,
    )

    let directionOffset = getDirectionOffset({ moveForward, moveBackward, moveLeft, moveRight })

    rotateQuaternion.setFromAxisAngle(rotateAngle, angleYCameraDirection + directionOffset)
    // invert rotation
    character.current.quaternion.rotateTowards(rotateQuaternion, 0.1)

    state.camera.getWorldPosition(walkDirection)
    walkDirection.y = 0
    walkDirection.normalize()
    walkDirection.applyAxisAngle(rotateAngle, directionOffset)

    if (moveForward || moveBackward || moveLeft || moveRight) {
      const velocity = 2 * dt

      // move model & camera
      const moveX = Math.min(walkDirection.x * velocity, MaxWalkingVelocity)
      const moveZ = Math.min(walkDirection.z * velocity, MaxWalkingVelocity)
      // applyImpulse only if linear velocity is less that MaxVelocity
      rigidbody.current.resetForces()
      rigidbody.current.applyImpulse({ x: moveX, y: 0, z: moveZ }, true)
      bodyPosition = rigidbody.current.translation()

      const cameraPosition = new Vector3()
      cameraPosition.copy(bodyPosition)
      cameraPosition.y += 0.8
      cameraPosition.z += 1.5
      smoothedCamerPosition.lerp(cameraPosition, 0.1)

      const cameraTarget = new Vector3()
      cameraTarget.copy(bodyPosition)
      cameraTarget.y += 0.25
      smoothedCameraTarget.lerp(cameraTarget, 0.1)

      state.camera.position.copy(smoothedCameraTarget)
      // state.camera.lookAt(cameraTarget)
      orbitControls.current.target = smoothedCameraTarget
    } else {
      // stop model & camera
      rigidbody.current.resetForces()
      rigidbody.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
    }
  })

  return (
    <>
      <RigidBody
        ref={rigidbody}
        colliders={false}
        enabledRotations={[false, false, false]}
        onCollisionEnter={() => {
          isOnFloor.current = true
        }}
        scale={[scale, scale, scale]}
      >
        <CapsuleCollider args={[0.8, 0.4]} position={[0, 1.2, 0]} />
        <group ref={character}>
          <Suspense fallback={null}>
            <Hero></Hero>
          </Suspense>
        </group>
      </RigidBody>
      <OrbitControls ref={orbitControls} />
    </>
  )
}

export default Player
