import { RigidBody } from '@react-three/rapier'
import { usePlayerStore } from '../store'
import { useSpring, config } from '@react-spring/web'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const Target = ({
  chapter,
  geometry = 'cylinder',
  geometryArgs = [1, 1, 1, 16],
  additionalGeometry = null,
  additionalGeometryArgs = [1, 1, 1],
  additionalGeometryOffsetPosition = [0, 0, 0],
  additionalGeometryRotation = [0, 0, 0],
  radius = 0.5,
  height = 2,
  priceOffsetPosition = [2, 0, 2],
  priceElevation = 1,
  offset = [0, 0, 0],
  position,
  children,
  transparent = false,
  seed = Math.random() + 0.8,
  childrenIsRigidBody = false,
}) => {
  // if vignette should be visible
  const price = useRef()
  const [props, api] = useSpring(() => ({
    scale: 0.5,
    config: config.wobbly,
    onChange: ({ value }) => {
      price.current.scale.set(value.scale, value.scale, value.scale)
    },
  }))

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const positionFactor = Math.sin(time * seed) * 0.2 + 1
    price.current.position.y = priceElevation + priceOffsetPosition[1] + positionFactor
    price.current.rotation.y += 0.025
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
      {!childrenIsRigidBody && children}
      {/* the first RigidBody is around the model given as childre and it makes use of the geometry props */}
      <RigidBody colliders={'hull'} type={'fixed'}>
        {childrenIsRigidBody ? (
          children
        ) : (
          <group>
            <mesh>
              {geometry === 'cylinder' && <cylinderGeometry args={geometryArgs} />}
              {geometry === 'box' && <boxGeometry args={geometryArgs} />}
              <meshStandardMaterial
                color="green"
                transparent={transparent}
                opacity={transparent ? 0 : 0.7}
              />
            </mesh>
            {additionalGeometry ? (
              <mesh
                rotation={additionalGeometryRotation}
                position={additionalGeometryOffsetPosition}
              >
                {additionalGeometry === 'box' && <boxGeometry args={additionalGeometryArgs} />}
                <meshStandardMaterial
                  color="green"
                  transparent={transparent}
                  opacity={transparent ? 0 : 0.7}
                />
              </mesh>
            ) : null}
          </group>
        )}
      </RigidBody>
      {/* the second RigidBody is to show off the price itself */}
      <RigidBody
        colliders={'hull'}
        type={'fixed'}
        position={priceOffsetPosition}
        onCollisionEnter={collisionEnterHandler}
        onCollisionExit={collisionExitHandler}
      >
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[radius, radius, height, 12]} />
          <meshStandardMaterial
            color={'var(--dark-blue)'}
            transparent={transparent}
            opacity={transparent ? 0 : 1}
          />
        </mesh>
      </RigidBody>
      {/* then the price as floating unreachable, hotpink icosaedron */}
      <group ref={price} scale={0.5} position={priceOffsetPosition}>
        <mesh castShadow receiveShadow>
          <icosahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color={'white'} />
        </mesh>
      </group>
    </group>
  )
}

export default Target
