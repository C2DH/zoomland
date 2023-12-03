import GroundViewSign from './GroundViewSign'
import BirdEyeViewSign from './BirdEyeViewSign'
import OverheadViewSign from './OverheadViewSign'
import {
  ViewTypeGround,
  ViewTypeOverhead,
  ViewTypeBirdEye,
  ColorByCategory,
  CategoryIntroduction,
} from '../constants'
import { useEffect, useRef } from 'react'
import { RigidBody } from '@react-three/rapier'
import { useSpring, config } from '@react-spring/web'
import { usePlayerStore } from '../store'
import PropTypes from 'prop-types'
import { Vector3 } from 'three'

const ComponentsByName = {
  [ViewTypeGround]: GroundViewSign,
  [ViewTypeOverhead]: OverheadViewSign,
  [ViewTypeBirdEye]: BirdEyeViewSign,
}

const Prize = ({
  id = '0-introduction',
  // this will set the prize component
  viewType = ViewTypeGround,
  // this will set the color
  category = CategoryIntroduction,
  // base position of the prize
  position = [0, 0, 0],
  radius = 0.6,
  height = 1,
  yMin = 0,
  yMax = 1,
  scaleMin = 1,
  scaleMax = 1.0,
  transparent = true,
  prizeOffsetPosition = [0, 0, 0],
}) => {
  const prizeRef = useRef(null)
  const colliderRef = useRef(null)
  const isCollected = useRef(usePlayerStore.getState().collectedChapters.some((d) => d.id === id))

  const [, api] = useSpring(() => ({
    scale: scaleMin,
    y: yMin,
    config: config.wobbly,
    onChange: ({ value }) => {
      if (prizeRef.current === null) return
      // console.log('[Prize] onChange', value)
      prizeRef.current.scale.set(value.scale, value.scale, value.scale)
      prizeRef.current.position.y = position[1] + value.y
    },
  }))
  const collectChapter = usePlayerStore((state) => state.collectChapter)
  const ViewTypeComponent = ComponentsByName[viewType]
  const color = ColorByCategory[category]

  const collisionEnterHandler = (e) => {
    if (isCollected.current) return
    if (e.rigidBodyObject.name === 'player') {
      console.debug(
        '[Prize] @collisionEnterHandler \n - chapter:',
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
        onRest: () => {
          console.debug('[Prize] @collisionEnterHandler onRest', id)
          api.start({
            scale: 0,
          })
          colliderRef.current.setNextKinematicTranslation({
            x: position[0],
            y: position[1] - 100,
            z: position[2],
          })
        },
      })
    }
  }
  const collisionExitHandler = (e) => {
    if (e.rigidBodyObject.name === 'player') {
      console.log('[Prize] collisionExitHandler', e.rigidBodyObject.name)
      // doneCollectingChapter(chapter)
      api.start({
        scale: isCollected.current ? 0 : scaleMin,
        y: yMin,
      })
    }
  }

  useEffect(
    () =>
      usePlayerStore.subscribe((state) => {
        isCollected.current = state.collectedChapters.some((d) => d.id === id)
        if (isCollected.current) {
          api.start({
            scale: 0,
          })
        }
      }),
    [],
  )

  if (isCollected.current) return null

  if (!color) {
    console.error(`[Prize] color ${color} not found ${id}`)
    return null
  }

  if (!ViewTypeComponent) {
    console.error(`[Prize] viewType ${viewType} not found ${id}`)
    return null
  }

  return (
    <group position={prizeOffsetPosition}>
      <RigidBody
        ref={colliderRef}
        colliders={'hull'}
        type={'kinematicPosition'}
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
      <group ref={prizeRef} scale={0.5} position={position}>
        <ViewTypeComponent color={color} />
      </group>
    </group>
  )
}

Prize.propTypes = {
  id: PropTypes.string.isRequired,
  viewType: PropTypes.string,
  category: PropTypes.string,
  position: PropTypes.arrayOf(PropTypes.number),
  radius: PropTypes.number,
  height: PropTypes.number,
  yMin: PropTypes.number,
  yMax: PropTypes.number,
  scaleMin: PropTypes.number,
  scaleMax: PropTypes.number,
  transparent: PropTypes.bool,
  prizeOffsetPosition: PropTypes.arrayOf(PropTypes.number),
}

export default Prize
