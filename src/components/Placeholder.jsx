import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

const PlaceHolder = () => {
  const cuboid = useRef()
  const jump = () => {
    console.log('[Placeholder] jump! again')
    cuboid.current.applyImpulse({ x: 0, y: 10, z: 0 })
  }
  const [subscribeKeys, getKeys] = useKeyboardControls()

  useFrame((state, dt) => {
    if (!cuboid.current) {
      return
    }
    const { moveForward, moveBackward, moveLeft, moveRight } = getKeys()
    if (moveForward || moveBackward || moveLeft || moveRight) {
      // move the body progressively
      const impulse = { x: 0, y: 0, z: 0 }
      if (moveForward) {
        impulse.z -= 0.1 * dt
      }
      cuboid.current.position.set(impulse)
    }
  })
  return (
    <RigidBody ref={cuboid} position={[-6, 4, 0]} restitution={0.5}>
      <mesh onClick={jump}>
        <boxBufferGeometry />
        <meshStandardMaterial />
      </mesh>
    </RigidBody>
  )
}

export default PlaceHolder
