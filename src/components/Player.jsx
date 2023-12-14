import Hero from './Hero'
import { Suspense, useEffect, useRef } from 'react'
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
import useSafeFrame from '../hooks'

const JumpForce = 0.9
const Speed = 0.7
const MaxVel = 3.5
const MaxSprintVel = 5
const FreeFallLinvel = 30

let internalDebounceTimer = null

const Player = ({ isMobile = false, scale = 0.6, position = DefaultPlayerPosition }) => {
  const rigidbody = useRef()
  const platformRef = useRef()
  const isOnFloor = useRef(true)
  const isOnFloorTimer = useRef(0)
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

  const movePlayerWithJoystick = (state, delta, shouldStayStill, linvel) => {
    const { moveForward, moveBackward, moveLeft, moveRight, jump, sprint, speedCoeff } =
      joystickRef.current
    if (moveForward || moveBackward || moveLeft || moveRight || jump) {
      movePlayerWithDirections({
        moveForward,
        moveBackward,
        moveLeft,
        moveRight,
        jump,
        sprint,
        state,
        delta,
        shouldStayStill,
        linvel,
        speedCoeff,
      })
    } else {
      setAnimation(AnimationIdle)
    }
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

  useSafeFrame((state, delta) => {
    if (!rigidbody.current) return
    const shouldStayStill = isCollectingQuest || isCollectingChapter || scene !== Gameplay
    // check velocity
    const linvel = rigidbody.current.linvel()

    if (linvel.y < -FreeFallLinvel || linvel.y > FreeFallLinvel) {
      translateTo(new Vector3(...position))
      return
    }
    isOnFloorTimer.current = isOnFloor.current ? 0 : isOnFloorTimer.current + 1
    if (isOnFloorTimer.current > 60) {
      console.debug('[Player] @useFrame - isOnFloorTimer', isOnFloorTimer.current)
      isOnFloor.current = true
      isOnFloorTimer.current = 0
    }
    if (isMobile) {
      movePlayerWithJoystick(state, delta, shouldStayStill, linvel)
      return
    }
    const { moveForward, moveBackward, moveLeft, moveRight, jump, sprint } = getKeys()
    const characterWorldPosition = movePlayerWithDirections({
      moveForward,
      moveBackward,
      moveLeft,
      moveRight,
      jump,
      state,
      sprint,
      delta,
      shouldStayStill,
      linvel,
    })
    updateCamera(state.camera, {
      target: characterWorldPosition,
      delta,
      angle: angle.current,
      radius: cameraOffsetRef.current.radius,
      elevation: cameraOffsetRef.current.elevation,
      disable: !cameraOffsetRef.current.followPlayer,
    })
  })

  const movePlayerWithDirections = ({
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    jump,
    sprint,
    delta,
    state,
    shouldStayStill,
    linvel,
    speedCoeff = 0.35,
    speed = Speed,
  }) => {
    const impulse = { x: 0, y: 0, z: 0 }
    // animation
    if (shouldStayStill && !jump) {
      setAnimation(AnimationIdle)
    } else if (jump && isOnFloor.current) {
      impulse.y += JumpForce
      rigidbody.current.applyImpulse(impulse)
      isOnFloor.current = false
      setAnimation(AnimationJump)
    } else {
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
        impulse.x += Math.sin(angle.current) * speed * speedCoeff
        impulse.z += Math.cos(angle.current) * speed * speedCoeff
        rigidbody.current.applyImpulse(impulse, true)
      } else if (moveBackward && quadLinvel < maxQuadVel) {
        impulse.x -= Math.sin(angle.current) * speed * speedCoeff * 0.35
        impulse.z -= Math.cos(angle.current) * speed * speedCoeff * 0.35
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
    return characterWorldPosition
  }

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
