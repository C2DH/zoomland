import { RigidBody } from '@react-three/rapier'
import { usePlayerStore } from '../store'
import { useSpring, config } from '@react-spring/web'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const Target = ({
  chapter,
  radius = 1,
  height = 1,
  placeHolderOffsetPosition = [0, 2, 0],
  offset = [0, 0, 0],
  position,
  children,
  transparent = true,
  seed = Math.random() + 0.8,
}) => {
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

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const positionFactor = Math.sin(time * seed) * 0.1
    price.current.position.y = placeHolderOffsetPosition[1] + positionFactor
    price.current.rotation.y += 0.005
  })

  const [collectChapter, doneCollectingChapter] = usePlayerStore((state) => [
    state.collectChapter,
    state.doneCollectingChapter,
  ])
  const collisionEnterHandler = (e) => {
    if (e.rigidBodyObject.name === 'player') {
      console.debug(
        '[Target] @collisionEnterHandler \n - chapter:',
        chapter.id,
        '\n - player position:',
        e.rigidBodyObject.position.x,
        e.rigidBodyObject.position.y,
        e.rigidBodyObject.position.z,
        '\n - target position:',
        position[0],
        position[1],
        position[2],
        '\n - offset vec (player position - position):',
        e.rigidBodyObject.position.x - position[0],
        e.rigidBodyObject.position.y - position[1],
        e.rigidBodyObject.position.z - position[2],
      )
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
  return (
    <group position={position}>
      <RigidBody
        colliders={'hull'}
        type={'fixed'}
        onCollisionEnter={collisionEnterHandler}
        onCollisionExit={collisionExitHandler}
        position={offset}
      >
        <mesh>
          <cylinderBufferGeometry args={[radius + 0.5, radius + 0.5, height, 16]} />
          <meshStandardMaterial
            color="green"
            transparent={transparent}
            opacity={transparent ? 0 : 1}
          />
        </mesh>
      </RigidBody>
      {children}
      <mesh>
        <cylinderBufferGeometry args={[radius, radius, height + 0.5, 32]} />
        <meshStandardMaterial color={'red'} />
      </mesh>
      <group ref={price} scale={0.5} position={placeHolderOffsetPosition}>
        <mesh castShadow receiveShadow>
          <icosahedronBufferGeometry args={[0.5, 0]} />

          <meshStandardMaterial color={'hotpink'} />
        </mesh>
      </group>
    </group>
  )
}

export default Target
