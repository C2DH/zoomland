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
  usePlayerStore,
} from '../store'

const JumpForce = 0.65
const Speed = 0.24
const MaxVel = 3.5
const RunVel = 1.6

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

const Player = ({ scale = 0.6, position = [2, 4, 2] }) => {
  const rigidbody = useRef()
  const isOnFloor = useRef(true)
  const previousKeysAndKeyDelta = useRef({
    moveLeft: false,
    moveRight: false,
    moveForward: false,
    moveBackward: false,
    kd: 0,
  })
  const character = useRef()
  const directionOffset = useRef({ x: 0, y: 0, z: 4 })
  // current caracter rotation
  const angle = useRef(0)
  const [, getKeys] = useKeyboardControls()
  const setAnimation = useAnimationStore((state) => state.setAnimation)
  const [isCollectingQuest, isCollectingChapter] = usePlayerStore((state) => [
    state.isCollectingQuest,
    state.isCollectingChapter,
  ])

  const [smoothedCameraTarget] = useState(() => new Vector3())

  useFrame((state, delta) => {
    const { moveForward, moveBackward, moveLeft, moveRight, jump } = getKeys()
    const shouldStayStill = isCollectingQuest || isCollectingChapter
    const impulse = { x: 0, y: 0, z: 0 }
    // animation
    if (shouldStayStill || (!moveForward && !moveBackward && !moveLeft && !moveRight && !jump)) {
      setAnimation(AnimationIdle)
    } else if (jump && isOnFloor.current) {
      impulse.y += JumpForce
      rigidbody.current.applyImpulse(impulse)
      isOnFloor.current = false
      setAnimation(AnimationJump)
    } else if (moveForward || moveBackward || moveLeft || moveRight) {
      const linvel = rigidbody.current.linvel()
      if (moveLeft) {
        angle.current += 2 * delta
        console.log('angle', angle.current)
      } else if (moveRight) {
        angle.current -= 2 * delta
        console.log('angle', angle.current)
      }
      const quadLinvel = linvel.z * linvel.z + linvel.x * linvel.x
      if (moveForward && quadLinvel < MaxVel * MaxVel) {
        // add current angle to the impulse
        impulse.x += Math.sin(angle.current) * Speed
        impulse.z += Math.cos(angle.current) * Speed
        console.log('impulse', impulse, linvel)
        rigidbody.current.applyImpulse(impulse, true)
        //     impulse.z += Speed
      }
      setAnimation(AnimationWalk)
    }

    const characterWorldPosition = character.current.getWorldPosition(new Vector3())
    // smooth rotation angle
    // character.current.rotation.y += angle.current * 0.1
    character.current.rotation.y += (angle.current - character.current.rotation.y) * 0.1
    updateCamera(state.camera, { target: characterWorldPosition, delta, angle: angle.current })
  })
  // const resetPosition = () => {
  //   rigidbody.current.setTranslation(vec3({ x: 0, y: 0, z: 0 }));
  //   rigidbody.current.setLinvel(vec3({ x: 0, y: 0, z: 0 }));
  // }
  // useFrame((state, delta) => {
  //   const { moveForward, moveBackward, moveLeft, moveRight, jump } = getKeys()
  //   const impulse = { x: 0, y: 0, z: 0 }
  //   // kd increase only if you keep hitting the same key
  //   let kd = 0
  //   const shouldStayStill = isCollectingQuest || isCollectingChapter
  //   if (shouldStayStill) {
  //     setAnimation(AnimationIdle)
  //   }
  //   if (!shouldStayStill && jump && isOnFloor.current) {
  //     impulse.y += JumpForce
  //     isOnFloor.current = false
  //     setAnimation(AnimationJump)
  //   }

  //   const linvel = rigidbody.current.linvel()
  //   let changeRotation = false
  //   if (!shouldStayStill && moveRight && linvel.x < MaxVel) {
  //     impulse.x += Speed
  //     changeRotation = true
  //     directionOffset.current = { x: -7, y: 0, z: 3 }
  //   }
  //   if (!shouldStayStill && moveLeft && linvel.x > -MaxVel) {
  //     if (previousKeysAndKeyDelta.current.moveLeft) {
  //       const kd = previousKeysAndKeyDelta.current.kd + delta
  //       const angle = Math.PI * 2 * kd
  //       const arcImpulse = {
  //         x: -Speed * Math.cos(angle),
  //         y: 0,
  //         z: Speed * Math.sin(angle),
  //       }
  //       impulse.x += arcImpulse.x
  //       impulse.y += arcImpulse.y
  //       impulse.z += arcImpulse.z
  //     } else {
  //       impulse.x -= Speed / 2 // Add this line to apply a gradual arc impulse to the left
  //     }
  //     changeRotation = true
  //     directionOffset.current = { x: 5, y: 0, z: 3 }
  //   }
  //   if (!shouldStayStill && moveBackward && linvel.z < MaxVel) {
  //     impulse.z += Speed
  //     changeRotation = true
  //     directionOffset.current = { x: 0, y: 0, z: 3 }
  //   }
  //   if (!shouldStayStill && moveForward && linvel.z > -MaxVel) {
  //     impulse.z -= Speed
  //     changeRotation = true
  //     directionOffset.current = { x: 0, y: 0, z: 3 }
  //     // directionOffset.current = { x: 0, y: 0, z: 5 }
  //   }
  //   // if (!moveForward && !moveBackward && !moveLeft && !moveRight) {
  //   //   directionOffset.current = { x: 0, y: 0, z: 5 }
  //   // }
  //   //
  //   previousKeysAndKeyDelta.current = { moveLeft, moveRight, moveForward, moveBackward, kd }

  //   rigidbody.current.applyImpulse(impulse, true)

  //   if (Math.abs(linvel.x) > RunVel || Math.abs(linvel.z) > RunVel) {
  //     setAnimation(AnimationRun)
  //   } else {
  //     setAnimation(AnimationIdle)
  //   }

  //   const angle = Math.atan2(linvel.x, linvel.z)
  //   // CAMERA FOLLOW
  //   const characterWorldPosition = character.current.getWorldPosition(new Vector3())
  //   const targetCameraPosition = new Vector3(
  //     characterWorldPosition.x + directionOffset.current.x,
  //     characterWorldPosition.y + 2.5,
  //     characterWorldPosition.z + directionOffset.current.z,
  //   )
  //   if (changeRotation) {
  //     console.info(
  //       'characterWorldPosition \n',
  //       JSON.stringify([
  //         Number(characterWorldPosition.x).toFixed(1),
  //         Number(characterWorldPosition.y).toFixed(1),
  //         Number(characterWorldPosition.z).toFixed(1),
  //       ]),
  //     )

  //     // gently rotate the character towards the direction of movement
  //     character.current.rotation.y = character.current.rotation.y * 0.8 + angle * 0.2
  //   }

  //   state.camera.position.lerp(targetCameraPosition, delta * 2)

  //   const targetLookAt = new Vector3(
  //     characterWorldPosition.x,
  //     characterWorldPosition.y + 2,
  //     characterWorldPosition.z,
  //   )

  //   const direction = new Vector3()
  //   state.camera.getWorldDirection(direction)

  //   const position = new Vector3()
  //   state.camera.getWorldPosition(position)

  //   const currentLookAt = position.clone().add(direction)
  //   const lerpedLookAt = new Vector3()

  //   lerpedLookAt.lerpVectors(currentLookAt, targetLookAt, delta * 2)
  //   state.camera.lookAt(lerpedLookAt)
  // })

  return (
    <>
      <RigidBody
        ref={rigidbody}
        name="player"
        colliders={false}
        enabledRotations={[false, false, false]}
        onCollisionEnter={() => {
          isOnFloor.current = true
        }}
        position={position}
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
