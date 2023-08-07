import React, { Suspense, useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Gameplay, OpenSea, Start, usePlayerStore } from '../store'
import { Vector3 } from 'three'
import { updateCamera } from '../utils/camera'
import { easings, useSpring } from '@react-spring/web'
import Hero from './Hero'

const Boat = ({
  positions = [
    [0, 0, 0],
    [0, 0, 0],
  ],
  ...props
}) => {
  const boatRef = useRef()
  const setScene = usePlayerStore((state) => state.setScene)
  const sceneRef = useRef(usePlayerStore.getState().scene)
  const { nodes, materials } = useGLTF('../assets/models/Boat.glb')
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
    },
  }))

  // Animate using nice springs instead
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const bendFactor = Math.sin(time * seed) * 0.2 + 0.2
    boatRef.current.rotation.z = bendFactor * 0.15
    boatRef.current.rotation.y = bendFactor * 0.1
    updateCamera(state.camera, {
      target: boatRef.current.getWorldPosition(new Vector3()),
      delta,
      angle: -Math.PI / 2,
      radius: 4,
      elevation: 2,
      disable: sceneRef.current === Gameplay,
    })
  })
  // slowly moving the boat to the final position
  // console.log(time)
  //   boatRef.current.position.lerp(new Vector3(...positions[1]), delta * 0.04)

  // })

  useEffect(() => {
    if (sceneRef.current === Gameplay) {
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
      } else if (state.scene === Start) {
        // do a transition to the harbour
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

  console.log('[Boat]', sceneRef.current)

  return (
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
  )
}

useGLTF.preload('../assets/models/Boat.glb')
export default Boat
