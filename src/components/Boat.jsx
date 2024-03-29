import { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import {
  Gameplay,
  OpenSea,
  SceneCredits,
  SceneEnding,
  SceneFakeBook,
  Start,
  usePlayerStore,
  useWorldStore,
} from '../store'
import { Vector3 } from 'three'
import { updateCamera } from '../utils/camera'
import { easings, useSpring } from '@react-spring/web'
import { RigidBody } from '@react-three/rapier'
import useSafeFrame from '../hooks'

const Boat = ({
  positions = [
    [0, 0, 0],
    [0, 0, 0],
  ],
  ...props
}) => {
  const boatRef = useRef()
  const platformRef = useRef()
  const setScene = usePlayerStore((state) => state.setScene)
  const sceneRef = useRef(usePlayerStore.getState().scene)
  const cameraOffsetRef = useRef(useWorldStore.getState().cameraOffset)
  const { nodes, materials } = useGLTF('assets/models/Boat.glb')
  const seed = Math.random() + 0.8
  const [, api] = useSpring(() => ({
    x: positions[0][0],
    y: positions[0][1],
    config: {
      easing: easings.easeInOutSine,
      duration: 10000,
    },
    onChange: ({ value }) => {
      // console.debug('[Boat] onChange', value)
      boatRef.current.position.x = value.x
      boatRef.current.position.y = value.y

      // translate rigidBody
      platformRef.current.setNextKinematicTranslation({
        x: value.x,
        y: positions[0][1] - 0.35,
        z: boatRef.current.position.z,
      })

      // platformRef.current.position.y = value.y - 0.35
    },
  }))

  // Animate using nice springs instead
  useSafeFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const bendFactor = Math.sin(time * seed) * 0.2 + 0.2
    boatRef.current.rotation.z = bendFactor * 0.15
    boatRef.current.rotation.y = bendFactor * 0.1
    updateCamera(state.camera, {
      target: boatRef.current.getWorldPosition(new Vector3()),
      delta,
      angle: -Math.PI / 2,
      radius: cameraOffsetRef.current.radius,
      elevation: cameraOffsetRef.current.elevation,
      disable:
        sceneRef.current === Gameplay ||
        sceneRef.current === SceneCredits ||
        sceneRef.current === SceneEnding,
    })
  })
  // slowly moving the boat to the final position
  // console.log(time)
  //   boatRef.current.position.lerp(new Vector3(...positions[1]), delta * 0.04)

  // })

  useEffect(() => {
    if (sceneRef.current === Gameplay || sceneRef.current === SceneCredits) {
      api.set({
        x: positions[1][0],
        y: positions[1][1],
      })
    }
    return usePlayerStore.subscribe((state) => {
      console.info('[Boat] scene changed', state.scene)
      if (state.scene === OpenSea) {
        // do a transition to the harbour
        api.start({
          x: positions[1][0],
          y: positions[1][1],
          onRest: () => {
            setScene(Gameplay)
          },
        })
      } else if (state.scene === Start || state.scene === SceneFakeBook) {
        // set the boat in the initial position
        api.set({
          x: positions[0][0],
          y: positions[0][1],
        })
      } else {
        // set the boat to the final position
        api.set({
          x: positions[1][0],
          y: positions[1][1],
        })
      }
      sceneRef.current = state.scene
    })
  }, [])
  useEffect(() => {
    // link radius
    return useWorldStore.subscribe((state) => (cameraOffsetRef.current = state.cameraOffset))
  }, [])

  console.log('[Boat]', sceneRef.current)

  return (
    <>
      <RigidBody
        type="kinematicPosition"
        ref={platformRef}
        friction={100}
        restitution={0}
        position={[positions[0][0], positions[0][1] - 0.35, positions[0][2]]}
      >
        <group>
          <mesh>
            <boxGeometry args={[5, 0.5, 5]} />
            <meshBasicMaterial transparent opacity={0} color="blue" />
          </mesh>
          <mesh position={[0.5, 0, 0]}>
            <boxGeometry args={[0.5, 4, 2]} />
            <meshBasicMaterial transparent opacity={0} color="red" />
          </mesh>
          <mesh position={[-1, 0, 0]}>
            <boxGeometry args={[0.5, 4, 2]} />
            <meshBasicMaterial transparent opacity={0} color="red" />
          </mesh>
        </group>
      </RigidBody>
      <group {...props} position={positions[0]} dispose={null} ref={boatRef}>
        <group position={[-0.17, 0.12, 0.03]} rotation={[0, 3, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane016.geometry}
            material={materials.Metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane016_1.geometry}
            material={materials.Sale}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane016_2.geometry}
            material={materials.Wood}
          />
        </group>
        {/* <Suspense fallback={null}>
        <Hero position={[0, -0.15, 0]} scale={0.25} />
      </Suspense> */}
      </group>
    </>
  )
}

useGLTF.preload('assets/models/Boat.glb')
export default Boat
