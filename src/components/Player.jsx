import Hero from './Hero'
import { Suspense, useEffect, useRef, useState } from 'react'
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
  usePlayerStore,
  useWorldStore,
} from '../store'
import { isMobile } from 'react-device-detect'

const JumpForce = 0.5
const Speed = 0.4
const MaxVel = 3.5
const MaxSprintVel = 5
const RunVel = 1.6

let internalDebounceTimer = null

const updateCamera = (camera, { radius = 2.5, target, delta, angle }) => {
  // the position should take into account the angle
  const phi = -1 * (angle + Math.PI / 2)
  camera.position.lerp(
    new Vector3(
      target.x + radius * Math.cos(phi),
      target.y + 1.5,
      target.z + radius * Math.sin(phi),
    ),
    delta * 2,
  )
  camera.lookAt(new Vector3(target.x, target.y + 1.5, target.z))
}

const Player = ({ isMobile = false, scale = 0.6 }) => {
  const rigidbody = useRef()
  const isOnFloor = useRef(true)
  const character = useRef()
  // joystick
  // Fetch initial state
  const joystickRef = useRef(useWorldStore.getState().joystick)
  // current caracter rotation
  const angle = useRef(0)
  const [, getKeys] = useKeyboardControls()
  const setAnimation = useAnimationStore((state) => state.setAnimation)
  const [isCollectingQuest, isCollectingChapter] = usePlayerStore((state) => [
    state.isCollectingQuest,
    state.isCollectingChapter,
  ])
  const [doneCollectingQuest, doneCollectingChapter] = usePlayerStore((state) => [
    state.doneCollectingQuest,
    state.doneCollectingChapter,
  ])
  const [initialPlayerPosition, initialPlayerAngle] = usePlayerStore((state) => [
    state.initialPlayerPosition,
    state.initialPlayerAngle,
  ])
  const [setPlayerPosition, setPlayerAngle] = useWorldStore((state) => [
    state.setPlayerPosition,
    state.setPlayerAngle,
  ])

  useEffect(() => {
    console.debug(
      '[Player] @useEffect',
      '\n - initialPlayerAngle:',
      initialPlayerAngle,
      '\n - initialPlayerPosition:',
      initialPlayerPosition,
    )
    angle.current = initialPlayerAngle
  }, [])

  // Connect to the store on mount, disconnect on unmount, catch state-changes in a reference
  useEffect(() => {
    if (isMobile) {
      useWorldStore.subscribe((state) => (joystickRef.current = state.joystick))
    }
  }, [])

  const movePlayerWithJoystick = (state, delta, shouldStayStill) => {
    const [joystickAngle, speed] = joystickRef.current
    if (shouldStayStill || speed === 0) {
      setAnimation(AnimationIdle)
    }
    character.current.rotation.y = (joystickAngle - character.current.rotation.y) * 0.75
    const characterWorldPosition = character.current.getWorldPosition(new Vector3())
    updateCamera(state.camera, { target: characterWorldPosition, delta, angle: joystickAngle })
  }

  useFrame((state, delta) => {
    const shouldStayStill = isCollectingQuest || isCollectingChapter
    if (isMobile) {
      movePlayerWithJoystick(state, delta, shouldStayStill)
      return
    }
    const { moveForward, moveBackward, moveLeft, moveRight, jump, sprint } = getKeys()

    const isMoving = moveForward || moveBackward || moveLeft || moveRight
    // if press space and shouldStaystill, then done collecting stuff
    if (jump && shouldStayStill) {
      if (isCollectingQuest) {
        doneCollectingQuest()
      } else if (isCollectingChapter) {
        doneCollectingChapter()
      }
      return
    }

    const impulse = { x: 0, y: 0, z: 0 }
    // animation
    if (shouldStayStill || (!isMoving && !jump)) {
      setAnimation(AnimationIdle)
    } else if (jump && isOnFloor.current) {
      impulse.y += JumpForce
      rigidbody.current.applyImpulse(impulse)
      isOnFloor.current = false
      setAnimation(AnimationJump)
    } else if (moveForward || moveBackward || moveLeft || moveRight) {
      const linvel = rigidbody.current.linvel()
      if (moveLeft) {
        angle.current += 1.2 * delta
      } else if (moveRight) {
        angle.current -= 1.2 * delta
      }
      const quadLinvel = linvel.z * linvel.z + linvel.x * linvel.x
      const maxQuadVel = MaxVel * MaxVel
      const maxForwardVel = sprint ? MaxSprintVel * MaxSprintVel : maxQuadVel
      if (moveForward && quadLinvel < maxForwardVel) {
        // add current angle to the impulse
        impulse.x += Math.sin(angle.current) * Speed
        impulse.z += Math.cos(angle.current) * Speed
        rigidbody.current.applyImpulse(impulse, true)
      } else if (moveBackward && quadLinvel < maxQuadVel) {
        impulse.x -= Math.sin(angle.current) * Speed * 0.5
        impulse.z -= Math.cos(angle.current) * Speed * 0.5
        rigidbody.current.applyImpulse(impulse, true)
      }
      if (quadLinvel < 0.5) {
        setAnimation(AnimationIdle)
      } else if (moveForward && sprint) {
        setAnimation(AnimationRun)
      } else {
        setAnimation(AnimationWalk)
      }
    }

    const characterWorldPosition = character.current.getWorldPosition(new Vector3())
    //
    // save current position every delta 5000ms
    if (parseInt(state.clock.elapsedTime % 5, 10) === 0) {
      clearTimeout(internalDebounceTimer)
      internalDebounceTimer = setTimeout(() => {
        setPlayerPosition(characterWorldPosition)
        setPlayerAngle(angle.current)
        console.debug('[Player] @useFrame - setPlayerPosition', characterWorldPosition)
      }, 1000)
    }
    // setPlayerPosition(characterWorldPosition)

    // smooth rotation angle
    // character.current.rotation.y += angle.current * 0.1
    character.current.rotation.y += (angle.current - character.current.rotation.y) * 0.75
    updateCamera(state.camera, { target: characterWorldPosition, delta, angle: angle.current })
  })

  return (
    <>
      <RigidBody
        ref={rigidbody}
        name="player"
        colliders={false}
        enabledRotations={[false, false, false]}
        position={initialPlayerPosition}
        onCollisionEnter={() => {
          isOnFloor.current = true
        }}
        scale={[scale, scale, scale]}
      >
        <CapsuleCollider args={[0.8, 0.4]} position={[0, 1.01, 0]} />
        <group ref={character}>
          <Hero position={[0, -0.25, 0]} />
        </group>
      </RigidBody>
    </>
  )
}

export default Player
