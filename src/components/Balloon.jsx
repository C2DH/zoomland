import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { usePlayerStore } from '../store'

const Balloon = (props) => {
  const collisionTimerRef = useRef()
  const collisionStatusRef = useRef(false)
  const balloonRef = useRef()
  const bodyRef = useRef()
  const { nodes, materials } = useGLTF('../assets/models/Balloon.glb')
  const seed = Math.random() + 0.8

  const observeLandscape = usePlayerStore((state) => state.observeLandscape)

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime() / 10
    const positionFactor = Math.sin(time) * 10 + 10
    balloonRef.current.position.y = positionFactor * 2
    bodyRef.current.setNextKinematicTranslation({
      x: balloonRef.current.position.x,
      y: balloonRef.current.position.y,
      z: balloonRef.current.position.z,
    })
    // balloonRef.current.rotation.y += 0.001
  })

  const debounceCollisionExit = () => {
    collisionStatusRef.current = false
    console.debug('[Balloon] collisionExitHandler')
    observeLandscape(false)
  }

  const collisionEnterHandler = (e) => {
    if (e.rigidBodyObject.name === 'player') {
      if (collisionStatusRef.current === false) {
        console.log('[Balloon] collisionEnterHandler', e.rigidBodyObject.name)
        observeLandscape(true)
      }
      collisionStatusRef.current = true
    }
  }

  const collisionExitHandler = (e) => {
    if (e.rigidBodyObject.name === 'player') {
      clearTimeout(collisionTimerRef.current)
      collisionTimerRef.current = setTimeout(debounceCollisionExit, 2000)
    }
  }

  return (
    <>
      <RigidBody
        position={props.position}
        ref={bodyRef}
        rotation={[0, 0, 0]}
        colliders={'hull'}
        type={'kinematicPosition'}
        friction={2}
        restitution={0}
        onCollisionEnter={collisionEnterHandler}
        onCollisionExit={collisionExitHandler}
      >
        <mesh>
          <boxGeometry args={[1.5, 0, 1.5]} />
          <meshStandardMaterial color={'red'} depthWrite={false} opacity={0} transparent={true} />
        </mesh>
        <mesh rotation={[0, 0, 1.55]} position={[-0.7, 0.75, 0]}>
          <boxGeometry args={[1.5, 0.05, 1.5]} />
          <meshStandardMaterial color={'red'} depthWrite={false} opacity={0} transparent={true} />
        </mesh>
        <mesh rotation={[0, 0, -1.55]} position={[0.7, 0.75, 0]}>
          <boxGeometry args={[1.5, 0.05, 1.5]} />
          <meshStandardMaterial color={'red'} depthWrite={false} opacity={0} transparent={true} />
        </mesh>
        <mesh rotation={[1.55, 0, 0]} position={[0, 0.75, -0.7]}>
          <boxGeometry args={[1.5, 0.05, 1.5]} />
          <meshStandardMaterial color={'red'} depthWrite={false} opacity={0} transparent={true} />
        </mesh>
      </RigidBody>
      <group {...props} dispose={null} ref={balloonRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Balloon.geometry}
          material={materials.Blue}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Balloon_1.geometry}
          material={materials.Red}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Balloon_2.geometry}
          material={materials.Wood}
        />
      </group>
    </>
  )
}

useGLTF.preload('../assets/models/Balloon.glb')
export default Balloon
