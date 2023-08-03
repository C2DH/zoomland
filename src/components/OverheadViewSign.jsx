import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'

const OverheadViewSign = ({ animation = true, color, ...props }) => {
  const signRef = useRef()
  const { nodes, materials } = useGLTF('../assets/models/OverheadViewSign.glb')
  const seed = 0.8
  // Animate the tree
  useFrame((state, delta) => {
    if (animation === true) {
      const time = state.clock.getElapsedTime()
      const positionFactor = Math.sin(time * seed) * 0.1
      signRef.current.position.y = 0.5 + positionFactor
      signRef.current.rotation.y += 0.005
    }
  })

  //Pick color - Media #fa953b, History - #306fc5, Hermeneutics - #9e43c8, Digital landscapes - #ed407d, Intro - #7c7c7c
  console.log('COLOR_SIGNM', color)
  const signColor = new MeshStandardMaterial({
    ...materials.Media,
    color: color,
  })

  return (
    <group ref={signRef} {...props} dispose={null}>
      <group name="Scene">
        <group name="Circle008">
          <mesh
            name="Circle015"
            castShadow
            receiveShadow
            geometry={nodes.Circle015.geometry}
            material={materials['1_WHITE']}
          />
          <mesh
            name="Circle015_1"
            castShadow
            receiveShadow
            geometry={nodes.Circle015_1.geometry}
            material={signColor}
          />
          <mesh
            name="Circle015_2"
            castShadow
            receiveShadow
            geometry={nodes.Circle015_2.geometry}
            material={signColor}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('../assets/models/OverheadViewSign.glb')
export default OverheadViewSign
