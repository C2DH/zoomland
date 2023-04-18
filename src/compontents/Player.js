import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RigidBody, useRapier } from '@react-three/rapier'
import { useEffect, useRef, useState } from 'react'
import Hero from './Hero'
import { CharacterAnimationsProvider } from '../contexts/CharacterAnimations'
import { Vector3 } from 'three'

const Player = () => {
  const [smoothedCameraPosition] = useState(() => new Vector3(10, 10, 10))
  const [smoothedCameraTarget] = useState(() => new Vector3())
  const [animationIndex, setAnimationIndex] = useState(0)
  const { rapier, world } = useRapier()
  const rapierWorld = world.raw()

  const body = useRef(null)
  const hero = useRef(null)
  const [subscribeKeys, getKeys] = useKeyboardControls()
  const jump = () => {
    const origin = body.current.translation()
    origin.y -= 0.31
    const direction = { x: 0, y: -1, z: 0 }
    const ray = new rapier.Ray(origin, direction)
    const hit = rapierWorld.castRay(ray, 3, true)
    if (hit.toi < 0.15) {
      body.current.applyImpulse({ x: 0, y: 0.5, z: 0 })
    }
  }
  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) jump()
      },
    )
    return unsubscribeJump
  }, [])

  // Keyboard
  useFrame((state, dt) => {
    const { moveForward, moveBackward, moveLeft, moveRight } = getKeys()
    if (body.current) {
      if (moveForward || moveBackward || moveLeft || moveRight) {
        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }
        const impulseStrength = 0.5 * dt
        const torqueStrength = 0.1 * dt

        if (moveForward) {
          impulse.z -= impulseStrength
          torque.x -= torqueStrength
        }
        if (moveBackward) {
          impulse.z += impulseStrength
          torque.x += torqueStrength
        }
        if (moveLeft) {
          impulse.x -= impulseStrength
          torque.z += torqueStrength
        }
        if (moveRight) {
          impulse.x += impulseStrength
          torque.z -= torqueStrength
        }
        console.info('running', animationIndex)
        setAnimationIndex(2)
        body.current.applyImpulse(impulse, true)
        body.current.applyTorqueImpulse(torque, true)
      } else {
        console.info('stop...', animationIndex)
        setAnimationIndex(0)
      }
    }
    const bodyPosition = body.current.translation()

    hero.current.position.copy(bodyPosition)

    const cameraPosition = new Vector3()
    cameraPosition.copy(bodyPosition)
    cameraPosition.z += 6.25
    cameraPosition.y += 1.95

    const cameraTarget = new Vector3()
    cameraTarget.copy(bodyPosition)
    cameraTarget.y += 1.5

    smoothedCameraPosition.lerp(cameraPosition, 5 * dt)
    smoothedCameraTarget.lerp(cameraTarget, 5 * dt)

    state.camera.position.copy(smoothedCameraPosition)
    state.camera.lookAt(smoothedCameraTarget)
  })

  return (
    <CharacterAnimationsProvider animationIndex={animationIndex}>
      <group ref={hero} position={[0, 1, 0]}>
        <Hero />
      </group>
      <RigidBody
        ref={body}
        position={[0, 1, 0]}
        restitution={0.3}
        friction={0.7}
        linearDamping={0.5}
        angularDamping={0.5}
        mass={10}
        colliders="ball"
      >
        <mesh>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshPhongMaterial color="#ff0000" opacity={0} transparent />
        </mesh>
      </RigidBody>
    </CharacterAnimationsProvider>
  )
}

export default Player
