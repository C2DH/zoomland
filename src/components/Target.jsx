import { RigidBody } from '@react-three/rapier'
import { usePlayerStore } from '../store'
import { useSpring, config } from '@react-spring/web'
import { useRef } from 'react'

const Target = ({ chapter, position, children }) => {
  // if vignette should be visible
  const price = useRef()
  const [props, api] = useSpring(() => ({
    scale: 0.5,

    // bounce
    config: config.wobbly,
    // },
    onChange: ({ value }) => {
      console.log('props', value.scale)
      price.current.scale.set(value.scale, value.scale, value.scale)
    },
  }))

  const [collectChapter, doneCollectingChapter] = usePlayerStore((state) => [
    state.collectChapter,
    state.doneCollectingChapter,
  ])
  const collisionEnterHandler = (e) => {
    if (e.rigidBodyObject.name === 'player') {
      console.log('[Target] collisionEnterHandler', e.rigidBodyObject.name)
      collectChapter(chapter)
      api.start({
        scale: 1.5,
      })
    }
  }
  const collisionExitHandler = (e) => {
    if (e.rigidBodyObject.name === 'player') {
      console.log('[Target] collisionExitHandler', e.rigidBodyObject.name)
      doneCollectingChapter(chapter)
      api.start({
        scale: 0.5,
      })
    }
  }
  const pricePosition = [position[0], position[1] + 1, position[2]]
  return (
    <>
      <RigidBody
        position={position}
        colliders="cuboid"
        type={'fixed'}
        onCollisionEnter={collisionEnterHandler}
        onCollisionExit={collisionExitHandler}
      >
        <mesh castShadow receiveShadow>
          <boxBufferGeometry />
          <meshStandardMaterial opacity={0} transparent />
        </mesh>
      </RigidBody>
      {children}
      <group ref={price} scale={0.5} position={pricePosition}>
        <mesh castShadow receiveShadow>
          <boxBufferGeometry />
          <meshStandardMaterial color={'pink'} />
        </mesh>
      </group>
    </>
  )
}

export default Target
