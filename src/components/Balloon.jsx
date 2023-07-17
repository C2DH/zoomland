import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { usePlayerStore } from '../store'
import { useSpring, easings } from '@react-spring/web'

const UpWithPlayer = 'up-with-player'
const DownWithPlayer = 'down-with-player'
const MovingUpWithPlayer = 'moving-with-player'

const DownNoPlayer = 'down-no-player'
const MovingUpNoPlayer = 'moving-no-player'
const UpNoPlayer = 'up-no-player'
const MovingDownNoPlayer = 'moving-down-no-player'

const Balloon = (props) => {
  const collisionTimerRef = useRef()
  const collisionStatusRef = useRef(false)

  const baloonStatusRef = useRef(DownNoPlayer)

  const balloonRef = useRef()
  const bodyRef = useRef()
  const baloonTimerRef = useRef()
  const { nodes, materials } = useGLTF('../assets/models/Balloon.glb')

  const [, api] = useSpring(() => ({
    n: 0,
    config: {
      duration: 10000,
      easing: easings.easeInOutSine,
    },
    onChange: ({ value }) => {
      // console.log('onChange', value)
      balloonRef.current.position.y = value.n
      bodyRef.current.setNextKinematicTranslation({
        x: balloonRef.current.position.x,
        y: balloonRef.current.position.y,
        z: balloonRef.current.position.z,
      })
    },
    onRest: ({ value }) => {
      console.log('[Baloon] arrived. onRest: ', value.n)
      if (value.n === 15) {
        baloonStatusRef.current = UpNoPlayer
      } else if (value.n === 0) {
        baloonStatusRef.current = DownNoPlayer
      }
    },
    // onRest: ({ value }) => {
    //   console.log('[Baloon] arrived. onRest: ', value.n)
    //   baloonTimerRef.current = setTimeout(() => {
    //     api.start({
    //       n: 0,
    //     })
    //   }, 3000)

    // balloonRef.current.position.y = n
    // bodyRef.current.setNextKinematicTranslation({
    //   x: balloonRef.current.position.x,
    //   y: balloonRef.current.position.y,
    //   z: balloonRef.current.position.z,
    // })
    // },
  }))

  const checkBaloonStatus = () => {
    console.log('[Balloon] check balloon status', baloonStatusRef.current)

    if (baloonStatusRef.current === DownNoPlayer) {
      baloonStatusRef.current = MovingUpNoPlayer
      api.start({
        n: 15,
      })
    } else if (baloonStatusRef.current === UpNoPlayer) {
      baloonStatusRef.current = MovingDownNoPlayer
      api.start({
        n: 0,
      })
    }
    console.log('[Balloon] update balloon status to:', baloonStatusRef.current)
  }

  useEffect(() => {
    console.log('[Balloon] useEffect')
    // check every 3 seconds if the balloon is still in the air
    baloonTimerRef.current = setInterval(checkBaloonStatus, 5000)
    return () => clearInterval(baloonTimerRef.current)
  }, [])

  const observeLandscape = usePlayerStore((state) => state.observeLandscape)

  // useFrame((state, delta) => {
  // const time = state.clock.getElapsedTime() / 10
  // const positionFactor = Math.sin(time) * 10 + 10
  // balloonRef.current.position.y = positionFactor * 2
  // bodyRef.current.setNextKinematicTranslation({
  //   x: balloonRef.current.position.x,
  //   y: balloonRef.current.position.y,
  //   z: balloonRef.current.position.z,
  // })
  // balloonRef.current.rotation.y += 0.001
  // })

  const debounceCollisionExit = () => {
    collisionStatusRef.current = false
    clearTimeout(collisionTimerRef.current)
    console.debug('[Balloon] collisionExitHandler')
    observeLandscape(false)
  }

  const collisionEnterHandler = (e) => {
    if (e.rigidBodyObject.name === 'player') {
      if (collisionStatusRef.current === false) {
        baloonStatusRef.current = MovingUpWithPlayer
        console.log('[Balloon] collisionEnterHandler', e.rigidBodyObject.name)
        observeLandscape(true)
        clearTimeout(collisionTimerRef.current)
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
      <group {...props} dispose={null}>
        <RigidBody colliders="cuboid" position={[0, -0.5, 0]} type={'fixed'}>
          <mesh>
            <boxGeometry args={[0.9, 0.8, 0.9]} />
            <meshStandardMaterial color={'red'} />
          </mesh>
        </RigidBody>
      </group>
      <group {...props} dispose={null}>
        <mesh>
          <boxGeometry args={[1, 0.01, 1]} receiveShadow />
          <meshStandardMaterial color={'blue'} />
        </mesh>
      </group>
      <RigidBody
        position={props.position}
        ref={bodyRef}
        rotation={[0, 0, 0]}
        colliders={'hull'}
        type={'kinematicPosition'}
        friction={2}
        restitution={0}
        onCollisionExit={collisionExitHandler}
        onCollisionEnter={collisionEnterHandler}
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
