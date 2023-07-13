/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/assets/models/Character.glb
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { usePlayerStore } from '../store'

const Character = (props) => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('../assets/models/Character.glb')
  const { actions } = useAnimations(animations, group)
  const isCollectingQuest = usePlayerStore((state) => state.isCollectingQuest)
  console.log(nodes, 'NODES')
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
        <group name="Armature001">
          <skinnedMesh
            name="Character"
            geometry={nodes.Character.geometry}
            material={materials.Material}
            skeleton={nodes.Character.skeleton}
            castShadow
            receiveShadow
          />
          <primitive object={nodes.mixamorigHips} />
          <primitive object={nodes.Ctrl_Master} />
          <primitive object={nodes.Ctrl_ArmPole_IK_Left} />
          <primitive object={nodes.Ctrl_Hand_IK_Left} />
          <primitive object={nodes.Ctrl_ArmPole_IK_Right} />
          <primitive object={nodes.Ctrl_Hand_IK_Right} />
          <primitive object={nodes.Ctrl_Foot_IK_Left} />
          <primitive object={nodes.Ctrl_LegPole_IK_Left} />
          <primitive object={nodes.Ctrl_Foot_IK_Right} />
          <primitive object={nodes.Ctrl_LegPole_IK_Right} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('../assets/models/Character.glb')
export default Character
