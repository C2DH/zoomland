import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { usePlayerStore } from '../store'

const Florentina = (props) => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('../assets/models/Florentina.glb')
  const { actions } = useAnimations(animations, group)
  const isCollectingQuest = usePlayerStore((state) => state.isCollectingQuest)
  const actionRef = useRef(false)
  useEffect(() => {
    if (actionRef.current) {
      actionRef.current.fadeOut(0.5)
    }
    if (isCollectingQuest) {
      actionRef.current = actions['Talking']
    } else {
      actionRef.current = actions['Idle']
    }
    actionRef.current.reset().fadeIn(0.5).play()
  }, [isCollectingQuest])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <skinnedMesh
            name="Object_17"
            geometry={nodes.Object_17.geometry}
            material={materials['Material.001']}
            skeleton={nodes.Object_17.skeleton}
            castShadow
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

useGLTF.preload('../assets/models/Florentina.glb')
export default Florentina
