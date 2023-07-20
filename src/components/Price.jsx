import GroundViewSign from './GroundViewSign'
import BirdEyeViewSign from './BirdEyeViewSign'
import OverheadViewSign from './OverheadViewSign'
import { ViewTypeGround, ViewTypeOverhead, ViewTypeBirdEye, ColorByCategory } from '../constants'
import { useRef } from 'react'
import { RigidBody } from '@react-three/rapier'
import { useSpring, config } from '@react-spring/web'
import { usePlayerStore } from '../store'

const ComponentsByName = {
  [ViewTypeGround]: GroundViewSign,
  [ViewTypeOverhead]: OverheadViewSign,
  [ViewTypeBirdEye]: BirdEyeViewSign,
}

const Price = ({
  id = '0-introduction',
  // this will set the price component
  viewType = ViewTypeGround,
  // this will set the color
  category = CategoryIntroduction,
  // base position of the price
  position = [0, 0, 0],
  radius = 0.5,
  height = 1.5,
  yMin = 0,
  yMax = 1,
  scaleMin = 0.5,
  scaleMax = 1.5,
  transparent = true,
}) => {
  const priceRef = useRef(null)
  const [, api] = useSpring(() => ({
    scale: scaleMin,
    y: yMin,
    config: config.wobbly,
    onChange: ({ value }) => {
      console.log('[Price] onChange', value)
      priceRef.current.scale.set(value.scale, value.scale, value.scale)
      priceRef.current.position.y = position[1] + value.y
    },
  }))
  const [collectChapter, doneCollectingChapter] = usePlayerStore((state) => [
    state.collectChapter,
    // state.doneCollectingChapter,
  ])
  const ViewTypeComponent = ComponentsByName[viewType]
  const color = ColorByCategory[category]

  const collisionEnterHandler = (e) => {
    if (e.rigidBodyObject.name === 'player') {
      console.debug(
        '[Price] @collisionEnterHandler \n - chapter:',
        id,
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
      collectChapter({ id: id })
      api.start({
        scale: scaleMax,
        y: yMax,
      })
    }
  }
  const collisionExitHandler = (e) => {
    if (e.rigidBodyObject.name === 'player') {
      console.log('[Price] collisionExitHandler', e.rigidBodyObject.name)
      // doneCollectingChapter(chapter)
      api.start({
        scale: scaleMin,
        y: yMin,
      })
    }
  }

  if (!color) {
    console.error(`[Price] color ${color} not found ${id}`)
    return null
  }

  if (!ViewTypeComponent) {
    console.error(`[Price] viewType ${viewType} not found ${id}`)
    return null
  }

  return (
    <>
      <RigidBody
        colliders={'hull'}
        type={'fixed'}
        onCollisionEnter={collisionEnterHandler}
        onCollisionExit={collisionExitHandler}
        position={position}
      >
        <mesh>
          <cylinderGeometry args={[radius, radius, height, 12]} />
          <meshStandardMaterial
            color={'var(--dark-blue)'}
            transparent={transparent}
            opacity={transparent ? 0 : 1}
          />
        </mesh>
      </RigidBody>
      <group ref={priceRef} scale={0.5} position={position}>
        <ViewTypeComponent color={color} />
      </group>
    </>
  )
}

export default Price
