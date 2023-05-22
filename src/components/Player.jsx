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
const MaxVel = 3
const RunVel = 1.5

const Player = ({ scale = 0.5, position = [2, 4, 2] }) => {
  const rigidbody = useRef()
  const isOnFloor = useRef(true)
  const character = useRef()
  const directionOffset = useRef({ x: 0, y: 0, z: 4 })
  const [, getKeys] = useKeyboardControls()
  const setAnimation = useAnimationStore((state) => state.setAnimation)
  // const camera = useThree((state) => state.camera)
  const [smoothedCameraPosition] = useState(() => new Vector3())
  const [smoothedCameraTarget] = useState(() => new Vector3())

  // const resetPosition = () => {
  //   rigidbody.current.setTranslation(vec3({ x: 0, y: 0, z: 0 }));
  //   rigidbody.current.setLinvel(vec3({ x: 0, y: 0, z: 0 }));
  // }
  useFrame((state, delta) => {
    const { moveForward, moveBackward, moveLeft, moveRight, jump } = getKeys()
    const impulse = { x: 0, y: 0, z: 0 }
    if (jump && isOnFloor.current) {
      impulse.y += JumpForce
      isOnFloor.current = false
      setAnimation(AnimationJump)
    }

    const linvel = rigidbody.current.linvel()
    let changeRotation = false
    if (moveRight && linvel.x < MaxVel) {
      impulse.x += Speed
      changeRotation = true
      directionOffset.current = { x: -7, y: 0, z: 3 }
    }
    if (moveLeft && linvel.x > -MaxVel) {
      impulse.x -= Speed
      changeRotation = true
      directionOffset.current = { x: 5, y: 0, z: 3 }
    }
    if (moveBackward && linvel.z < MaxVel) {
      impulse.z += Speed
      changeRotation = true
      directionOffset.current = { x: 0, y: 0, z: 3 }
    }
    if (moveForward && linvel.z > -MaxVel) {
      impulse.z -= Speed
      changeRotation = true
      directionOffset.current = { x: 0, y: 0, z: 3 }
      // directionOffset.current = { x: 0, y: 0, z: 5 }
    }
    // if (!moveForward && !moveBackward && !moveLeft && !moveRight) {
    //   directionOffset.current = { x: 0, y: 0, z: 5 }
    // }

    rigidbody.current.applyImpulse(impulse, true)

    if (Math.abs(linvel.x) > RunVel || Math.abs(linvel.z) > RunVel) {
      setAnimation(AnimationRun)
    } else {
      setAnimation(AnimationIdle)
    }

    const angle = Math.atan2(linvel.x, linvel.z)
    // CAMERA FOLLOW
    const characterWorldPosition = character.current.getWorldPosition(new Vector3())

    const targetCameraPosition = new Vector3(
      characterWorldPosition.x + directionOffset.current.x,
      characterWorldPosition.y + 2.5,
      characterWorldPosition.z + directionOffset.current.z,
    )
    if (changeRotation) {
      // gently rotate the character towards the direction of movement
      character.current.rotation.y = character.current.rotation.y * 0.8 + angle * 0.2
    }

    state.camera.position.lerp(targetCameraPosition, delta * 0.8)

    const targetLookAt = new Vector3(
      characterWorldPosition.x,
      characterWorldPosition.y + 1.5,
      characterWorldPosition.z,
    )

    const direction = new Vector3()
    state.camera.getWorldDirection(direction)

    const position = new Vector3()
    state.camera.getWorldPosition(position)

    const currentLookAt = position.clone().add(direction)
    const lerpedLookAt = new Vector3()

    lerpedLookAt.lerpVectors(currentLookAt, targetLookAt, delta * 2)

    state.camera.lookAt(lerpedLookAt)
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
        position={position}
        scale={[scale, scale, scale]}
      >
        <CapsuleCollider args={[0.8, 0.4]} position={[0, 1.2, 0]} />
        <group ref={character}>
          <Hero />
        </group>
      </RigidBody>
    </>
  )
}

export default Player
