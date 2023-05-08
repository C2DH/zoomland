import Hero from './Hero'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import { useKeyboardControls } from '@react-three/drei'
import { Vector3 } from 'three'

const JumpForce = 0.5
const Speed = 0.1
const MaxVelocity = 3

const Player = ({ debug = false, scale = 0.5 }) => {
  const rigidbody = useRef()
  const isOnFloor = useRef(false)
  const character = useRef()
  const [subscribeKeys, getKeys] = useKeyboardControls()
  useFrame((state, dt) => {
    const { moveForward, moveBackward, moveLeft, moveRight, jump } = getKeys()
    console.debug('[Player] move', { moveForward, moveBackward, moveLeft, moveRight, jump })
    const impulse = { x: 0, y: 0, z: 0 }
    if (jump && isOnFloor.current) {
      impulse.y += JumpForce
      isOnFloor.current = false
    }
    if (!isOnFloor.current) {
      return
    }
    const linvel = rigidbody.current.linvel()
    let changeRotation = false
    if (moveRight && linvel.x < MaxVelocity) {
      impulse.x += Speed
      changeRotation = true
    }
    if (moveLeft && linvel.x > -MaxVelocity) {
      impulse.x -= Speed
      changeRotation = true
    }
    if (moveBackward && linvel.z < MaxVelocity) {
      impulse.z += Speed
    }
    if (moveForward && linvel.z > -MaxVelocity) {
      impulse.z -= Speed
    }

    rigidbody.current.applyImpulse(impulse, true)
    if (changeRotation) {
      const angle = Math.atan2(linvel.x, linvel.z)
      character.current.rotation.y = angle
    }

    const bodyPosition = rigidbody.current.translation()

    // move camera
    // const cameraPosition = new Vector3()
    // cameraPosition.copy(bodyPosition)
    // cameraPosition.z += 1.5
    // cameraPosition.y += 0.4

    // const cameraTarget = new Vector3()
    // cameraTarget.copy(bodyPosition)
    // cameraTarget.y += 0.5

    // const smoothedCameraPosition = new Vector3()
    // const smoothedCameraTarget = new Vector3()
    // smoothedCameraPosition.lerp(cameraPosition, 5 * dt)
    // smoothedCameraTarget.lerp(cameraTarget, 5 * dt)
    // // if (!debug) {
    // state.camera.position.copy(smoothedCameraPosition)
    // state.camera.lookAt(smoothedCameraTarget)
    // }
  })

  return (
    <group>
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
          <Hero></Hero>
        </group>
      </RigidBody>
    </group>
  )
}

export default Player
