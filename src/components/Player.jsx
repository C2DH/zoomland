import Hero from './Hero'
import { Suspense, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import { useKeyboardControls } from '@react-three/drei'
import { Vector3 } from 'three'
import {
  AnimationIdle,
  AnimationJump,
  AnimationRun,
  AnimationWalk,
  DefaultPlayerAngle,
  DefaultPlayerPosition,
  Gameplay,
  Start,
  useAnimationStore,
  usePlayerStore,
  useWorldStore,
} from '../store'
import { updateCamera } from '../utils/camera'
import { useQueueStore } from '../store/preload'
// import { isMobile } from 'react-device-detect'

const JumpForce = 0.7
const Speed = 1.3
const MaxVel = 3.5
const MaxSprintVel = 5
const FreeFallLinvel = 30

let internalDebounceTimer = null

const Player = ({ isMobile = false, scale = 0.6, position = DefaultPlayerPosition }) => {
  const rigidbody = useRef()
  const platformRef = useRef()
  const isOnFloor = useRef(true)
  const character = useRef()
  // joystick
  // Fetch initial state
  const joystickRef = useRef(useWorldStore.getState().joystick)
  const cameraOffsetRef = useRef(useWorldStore.getState().cameraOffset)
  // current caracter rotation
  const angle = useRef(0)
  const [, getKeys] = useKeyboardControls()
  const setAnimation = useAnimationStore((state) => state.setAnimation)
  const [isCollectingQuest, isCollectingChapter] = usePlayerStore((state) => [
    state.isCollectingQuest,
    state.isCollectingChapter,
  ])
  const [initialPlayerPosition, initialPlayerAngle] = usePlayerStore((state) => [
    state.initialPlayerPosition,
    state.initialPlayerAngle,
  ])
  const [setPlayerPosition, setPlayerAngle] = useWorldStore((state) => [
    state.setPlayerPosition,
    state.setPlayerAngle,
  ])

  const scene = usePlayerStore((state) => state.scene)

  useEffect(() => {
    console.debug(
      '[Player] @useEffect',
      '\n - initialPlayerAngle:',
      initialPlayerAngle,
      '\n - initialPlayerPosition:',
      initialPlayerPosition,
    )
    if (isMobile) {
      angle.current = DefaultPlayerAngle
    } else {
      angle.current = initialPlayerAngle
    }
  }, [])

  useEffect(() => {
    if (scene === 'gameplay') {
      console.debug('[Player] @useEffect - reset player position')
      translateTo(new Vector3(...initialPlayerPosition))
    } else if (scene === Start) {
      translateTo(new Vector3(...[123.6, -1.6, -10.2]))
      return
    }
  }, [scene])

  // Connect to the store on mount, disconnect on unmount, catch state-changes in a reference
  useEffect(() => {
    if (isMobile) {
      return useWorldStore.subscribe((state) => (joystickRef.current = state.joystick))
    }
    // link radius
    return useWorldStore.subscribe((state) => (cameraOffsetRef.current = state.cameraOffset))
  }, [])

  useEffect(() => {
    return useQueueStore.subscribe((state) => {
      console.debug(
        '[Player] @useEffect - useQueueStore.subscribe',
        state.loaded,
        state.isLoadingComplete,
      )
      platformRef.current.setTranslation(
        new Vector3([
          initialPlayerPosition[0],
          initialPlayerPosition[1] + 10,
          initialPlayerPosition[2],
        ]),
        true,
      )
    })
  }, [])

  const movePlayerWithJoystick = (state, delta, shouldStayStill) => {
    const [steeringAngle, speed] = joystickRef.current
    if (shouldStayStill || speed < 0.1) {
      setAnimation(AnimationIdle)
    } else if (speed < 0.5) {
      setAnimation(AnimationWalk)
    } else if (speed >= 0.5) {
      setAnimation(AnimationRun)
    }
    if (!shouldStayStill && speed >= 0.1) {
      const linvel = rigidbody.current.linvel()
      const quadLinvel = linvel.z * linvel.z + linvel.x * linvel.x
      const maxQuadVel = MaxVel * MaxVel
      const impulse = { x: 0, y: 0, z: 0 }

      if (speed > 0) {
        const maxForwardVel = speed < 0.5 ? MaxVel : MaxSprintVel
        if (speed && quadLinvel < maxForwardVel) {
          // add current angle to the impulse
          impulse.x += Math.sin(angle.current) * Speed
          impulse.z += Math.cos(angle.current) * Speed
          rigidbody.current.applyImpulse(impulse, true)
        }
      } else {
        // move backward
        if (quadLinvel < maxQuadVel) {
          impulse.x -= Math.sin(angle.current) * Speed * 0.35
          impulse.z -= Math.cos(angle.current) * Speed * 0.35
          rigidbody.current.applyImpulse(impulse, true)
        }
      }
    }

    angle.current += speed > 0 ? -steeringAngle * delta : 0
    // console.debug(angle.current)
    character.current.rotation.y += (angle.current - character.current.rotation.y) * 0.75
    const characterWorldPosition = character.current.getWorldPosition(new Vector3())
    updateCamera(state.camera, { target: characterWorldPosition, delta, angle: angle.current })
  }

  const translateTo = (v) => {
    console.debug('[Player] @translateTo', v)
    // reset position
    rigidbody.current.resetForces(true)
    rigidbody.current.setLinvel(new Vector3(0, 0, 0), true)
    rigidbody.current.setGravityScale(0)
    rigidbody.current.setTranslation(v, true)
    rigidbody.current.setGravityScale(1)
  }

  useFrame((state, delta) => {
    if (!rigidbody.current) return
    const shouldStayStill = isCollectingQuest || isCollectingChapter || scene !== Gameplay
    // check velocity
    const linvel = rigidbody.current.linvel()

    if (linvel.y < -FreeFallLinvel || linvel.y > FreeFallLinvel) {
      translateTo(new Vector3(...position))
      return
    }

    if (isMobile) {
      movePlayerWithJoystick(state, delta, shouldStayStill)
      return
    }
    const { moveForward, moveBackward, moveLeft, moveRight, jump, sprint } = getKeys()

    const isMoving = moveForward || moveBackward || moveLeft || moveRight
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
    updateCamera(state.camera, {
      target: characterWorldPosition,
      delta,
      angle: angle.current,
      radius: cameraOffsetRef.current.radius,
      elevation: cameraOffsetRef.current.elevation,
      disable: !cameraOffsetRef.current.followPlayer,
    })
  })

  return (
    <>
      <RigidBody
        ref={platformRef}
        type="fixed"
        colliders={'cuboid'}
        position={[
          initialPlayerPosition[0],
          initialPlayerPosition[1] + 0.5,
          initialPlayerPosition[2],
        ]}
      >
        <mesh>
          <boxGeometry args={[5, 0.5, 5]} />
          <meshStandardMaterial depthWrite={false} color={'red'} transparent={true} opacity={0} />
        </mesh>
      </RigidBody>
      <RigidBody
        ref={rigidbody}
        restitution={0}
        name="player"
        colliders={false}
        mass={2.2}
        enabledTranslations={[true, true, true]}
        enabledRotations={[false, false, false]}
        position={[
          initialPlayerPosition[0],
          initialPlayerPosition[1] + 2,
          initialPlayerPosition[2],
        ]}
        onCollisionEnter={() => {
          isOnFloor.current = true
        }}
        scale={[scale, scale, scale]}
      >
        <CapsuleCollider args={[0.8, 0.4]} position={[0, 1.01, 0]} />
        <group ref={character}>
          <Suspense>
            <Hero position={[0, -0.25, 0]} />
          </Suspense>
        </group>
      </RigidBody>
    </>
  )
}

export default Player
