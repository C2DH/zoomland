import { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useSpring, easings } from '@react-spring/web'
import Sensor from './Sensor'

const BeforeFlyingUp = 'before-flying-up'
const BeforeFlyingDown = 'before-flying-down'
const FlyingUp = 'flying-up'
const FlyingDown = 'flying-down'
// const GroundWithPlayer = 'down-with-player'
// const GroundNoPlayer = 'down-no-player'
// const UpNoPlayer = 'up-no-player'
// const UpWithPlayer = 'up-with-player'

// const CheckInText = 'Ready?'
// const CheckOutText = 'Free ride!'

const Balloon = ({ yMax = 20, yMin = 0.0, waitingTime = 5000, ...props }) => {
  const collisionTimerRef = useRef()
  const collisionStatusRef = useRef(false)
  const intersectionStatusRef = useRef(false)
  // text threejs reference and its countdown timer (if any)
  // const textRef = useRef()
  const textTimerRef = useRef()
  // balloon status, threejs reference and timer to go up and down
  const baloonStatusRef = useRef(FlyingDown)
  const balloonRef = useRef()
  const baloonTimerRef = useRef()
  // rigidbody reference
  const bodyRef = useRef()
  const { nodes, materials } = useGLTF('assets/models/Balloon.glb')

  const [, api] = useSpring(() => ({
    n: 0,
    config: {
      duration: 2000 * (yMax - yMin),
      easing: easings.easeInOutSine,
    },
    onChange: ({ value }) => {
      if (balloonRef.current) {
        balloonRef.current.position.y = value.n

        bodyRef.current.setNextKinematicTranslation({
          x: balloonRef.current.position.x,
          y: balloonRef.current.position.y,
          z: balloonRef.current.position.z,
        })
      }
    },
    onRest: ({ value }) => {
      console.log(
        '[Balloon] arrived. Altitude:',
        value.n,
        // value.n > yMin ? 'up' : 'down',
        baloonStatusRef.current,
      )
      if (baloonStatusRef.current == FlyingUp) {
        // baloonStatusRef.current =
        //   intersectionStatusRef.current && collisionStatusRef.current ? UpWithPlayer : UpNoPlayer
        // writeText('Max altitude reached.')
        console.log('[Balloon] should go down now...')
        landing()
      } else if (baloonStatusRef.current == FlyingDown) {
        // writeText('Up...')
        // baloonStatusRef.current = intersectionStatusRef.current ? GroundWithPlayer : GroundNoPlayer
        takeOff()
      }
    },
  }))

  // const writeText = (text) => {
  //   if (textRef.current) {
  //     textRef.current.text = text
  //   }
  // }

  const debounceCollisionEnter = () => {
    clearTimeout(collisionTimerRef.current)
    collisionTimerRef.current = setTimeout(() => {
      if (!collisionStatusRef.current) {
        collisionStatusRef.current = true
        checkIn()
      }
    }, 2000)
  }
  const debounceCollisionExit = () => {
    clearTimeout(collisionTimerRef.current)
    collisionTimerRef.current = setTimeout(() => {
      if (collisionStatusRef.current) {
        collisionStatusRef.current = false
        checkOut()
      }
    }, 2000)
  }

  const checkIn = () => {
    // if (baloonStatusRef.current !== GroundNoPlayer) {
    // no checkin if the balloon is not on the ground
    //   return
    // }
    // console.debug(
    //   '[Balloon] checkIn',
    //   '\n - instersectionStatusRef.current:',
    //   intersectionStatusRef.current,
    //   '\n - collisionStatusRef.current:',
    //   collisionStatusRef.current,
    // )

    if (intersectionStatusRef.current == true && collisionStatusRef.current == true) {
      console.debug('[Balloon] checkIn: go up!')
      // baloonStatusRef.current = GoingUpWithPlayer
      takeOff()
    }
  }

  const checkOut = () => {
    console.debug('[Balloon] checkOut...')
    // baloondemo
  }

  const takeOff = () => {
    if (baloonStatusRef.current === FlyingUp || baloonStatusRef.current === BeforeFlyingUp) {
      console.warn('[Balloon] takeOff: already flying up?')
      return
    }
    // if (
    //   baloonStatusRef.current !== GroundNoPlayer &&
    //   baloonStatusRef.current !== GroundWithPlayer
    // ) {
    //   console.warn('[Balloon] takeOff: not on the ground?')
    //   return
    // }
    // console.debug('[Balloon] takeOff in 3s!')
    // countdown()
    // start the balloon
    clearTimeout(baloonTimerRef.current)
    baloonStatusRef.current = BeforeFlyingUp
    baloonTimerRef.current = setTimeout(() => {
      console.debug('[Balloon] fly!')
      baloonStatusRef.current = FlyingUp
      api.start({
        n: yMax,
      })
    }, waitingTime)
  }

  const landing = () => {
    if (baloonStatusRef.current === FlyingDown || baloonStatusRef.current === BeforeFlyingDown) {
      console.warn('[Balloon] landing: already flying down?')
      return
    }
    console.debug('[Balloon] landing...')
    // start the balloon
    clearTimeout(baloonTimerRef.current)
    baloonStatusRef.current = BeforeFlyingDown
    baloonTimerRef.current = setTimeout(() => {
      console.debug('[Balloon] land!!')
      baloonStatusRef.current = FlyingDown
      api.start({
        n: yMin,
      })
    }, waitingTime)
  }

  useEffect(() => {
    console.log('[Balloon] useEffect, status:', baloonStatusRef.current)
    if (baloonStatusRef.current === FlyingUp || baloonStatusRef.current === BeforeFlyingUp) {
      landing()
    } else if (
      baloonStatusRef.current === FlyingDown ||
      baloonStatusRef.current === BeforeFlyingDown
    ) {
      takeOff()
    }
    // check every 3 seconds if the balloon is still in the air
    // baloonTimerRef.current = setInterval(checkBaloonStatus, 10000)
    return () => {
      clearTimeout(baloonTimerRef.current)
      clearTimeout(collisionTimerRef.current)
      clearInterval(textTimerRef.current)
    }
  }, [])

  return (
    <>
      <Sensor
        height={50}
        position={props.position}
        onIntersectionEnter={() => {
          intersectionStatusRef.current = true
          checkIn()
        }}
        onIntersectionExit={() => {
          intersectionStatusRef.current = false
          checkOut()
        }}
      />
      <RigidBody
        position={props.position}
        ref={bodyRef}
        rotation={[0, 0, 0]}
        colliders={'hull'}
        type={'kinematicPosition'}
        friction={5}
        restitution={0}
        onCollisionExit={debounceCollisionExit}
        onCollisionEnter={debounceCollisionEnter}
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

      {/* <Suspense fallback={null}>
        <group {...props} dispose={null}>
          <Text
            position={[1, 0.5, 0]}
            ref={textRef}
            scale={[0.1, 0.1, 0.1]}
            color="black" // default
            anchorX="center" // default
            anchorY="middle" // default
          >
            {CheckOutText}
          </Text>
        </group>
      </Suspense> */}
      {/* platform  */}
      {/* <mesh
        position={[props.position[0], props.position[1] - 0.03, props.position[2]]}
        receiveShadow
        castShadow
      >
        <cylinderGeometry receiveShadow args={[1.5, 0.5, 0.1, 32]} />
        <meshBasicMaterial receiveShadow>
          <GradientTexture
            stops={[0, 1]} // As many stops as you want
            colors={['aquamarine', 'hotpink']} // Colors need to match the number of stops
            size={1024} // Size is optional, default = 1024
          />
        </meshBasicMaterial>
      </mesh> */}
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
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Balloon_3.geometry}
          material={materials.Logo}
        />
      </group>
    </>
  )
}

useGLTF.preload('assets/models/Balloon.glb')
export default Balloon
