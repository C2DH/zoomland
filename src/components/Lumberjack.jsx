/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 Lumberjack.gltf
Author: micaelsampaio (https://sketchfab.com/micaelsampaio)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/lumberjack-low-poly-character-d88d033c86a243f78349f935f78ba057
Title: Lumberjack Low Poly Character
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { usePlayerStore } from '../store'

const Lumberjack = (props) => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('../assets/models/Lumberjack.glb')
  const { actions } = useAnimations(animations, group)
  const isCollectingQuest = usePlayerStore((state) => state.isCollectingQuest)
  console.debug('[Lumberjack] isCollectingQuest', isCollectingQuest, actions)
  useEffect(() => {
    if (isCollectingQuest) {
      actions['Idle'].fadeOut(0.5)
      actions['Talking'].reset().fadeIn(0.5).play()
    } else {
      actions['Talking'].fadeOut(0.5)
      actions['Idle'].reset().fadeIn(0.5).play()
    }
  }, [isCollectingQuest])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="Cube001_Cube003"
            geometry={nodes.Cube001_Cube003.geometry}
            material={materials['Material.001']}
            skeleton={nodes.Cube001_Cube003.skeleton}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="Cube002_Cube004"
            geometry={nodes.Cube002_Cube004.geometry}
            material={materials['Material.001']}
            skeleton={nodes.Cube002_Cube004.skeleton}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="Cube_Cube001"
            geometry={nodes.Cube_Cube001.geometry}
            material={materials['Material.001']}
            skeleton={nodes.Cube_Cube001.skeleton}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="Cylinder001_Cylinder004"
            geometry={nodes.Cylinder001_Cylinder004.geometry}
            material={materials['Material.001']}
            skeleton={nodes.Cylinder001_Cylinder004.skeleton}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="Cylinder_Cylinder002"
            geometry={nodes.Cylinder_Cylinder002.geometry}
            material={materials['Material.001']}
            skeleton={nodes.Cylinder_Cylinder002.skeleton}
            castShadow
            receiveShadow
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('../assets/models/Lumberjack.glb')

export default Lumberjack
