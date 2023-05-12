import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import {
  AnimationIdle,
  AnimationRun,
  AnimationWalk,
  AnimationJump,
  useAnimationStore,
} from '../store'

const Hero = (props) => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('../assets/models/Hero.gltf')
  const { actions, names } = useAnimations(animations, group)
  console.log('[Hero]', { nodes, materials, animations, actions, names })
  // remap animation names to current const
  const mappedActions = {
    [AnimationIdle]: actions['idle_Armature'],
    [AnimationRun]: actions['runnig'], // sic
    [AnimationWalk]: actions['walking'],
    [AnimationJump]: actions['jumping'],
  }

  const [animation, previousAnimation] = useAnimationStore((state) => [
    state.animation,
    state.previousAnimation,
  ])

  useEffect(() => {
    const action = mappedActions[animation]

    console.debug('[Hero] animation changed', animation, action, actions)

    // if previousAction is not the same as current action, stop previous action
    // and play current action
    if (previousAnimation) {
      const previousAction = mappedActions[previousAnimation]
      previousAction.fadeOut(0.5)
    }
    if (action) {
      action.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(0.5).play()
    }
  }, [actions, animation, previousAnimation])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
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
          <group name="girl">
            <skinnedMesh
              name="Mesh"
              geometry={nodes.Mesh.geometry}
              material={materials.Skin}
              skeleton={nodes.Mesh.skeleton}
            />
            <skinnedMesh
              name="Mesh_1"
              geometry={nodes.Mesh_1.geometry}
              material={materials.Skirt}
              skeleton={nodes.Mesh_1.skeleton}
            />
            <skinnedMesh
              name="Mesh_2"
              geometry={nodes.Mesh_2.geometry}
              material={materials.Head}
              skeleton={nodes.Mesh_2.skeleton}
            />
          </group>
        </group>
        <group name="cs_grp">
          <group name="cs_arm_fk" position={[1.5, 8.5, 0]} scale={0.82} />
          <group name="cs_calf_fk" position={[0.5, 8.5, 0]} scale={0.82} />
          <group name="cs_circle" position={[0.5, 4.5, 0]} scale={0.21} />
          <group
            name="cs_foot"
            position={[0.5, 10.5, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={0.31}
          />
          <group
            name="cs_foot001"
            position={[0.5, 10.5, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={0.31}
          />
          <group
            name="cs_foot002"
            position={[0.5, 10.5, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={0.31}
          />
          <group
            name="cs_foot_01"
            position={[0.5, 18.5, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={2.19}
          />
          <group name="cs_foot_roll" position={[0.5, 12.5, 0]} scale={0.59} />
          <group name="cs_forearm_fk" position={[2.5, 8.5, 0]} scale={0.82} />
          <group
            name="cs_hand"
            position={[0.5, 19.5, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={0.31}
          />
          <group name="cs_head" position={[0.5, 13.5, 0]} scale={0.21} />
          <group name="cs_hips" position={[0.5, 11.5, 0]} scale={0.21} />
          <group name="cs_master" position={[0.5, 17.5, 0]} scale={0.1} />
          <group name="cs_neck" position={[0.5, 14.5, 0]} scale={0.21} />
          <group
            name="cs_shoulder_left"
            position={[0.5, 15.5, 0]}
            rotation={[-Math.PI, -Math.PI / 2, 0]}
            scale={1.04}
          />
          <group
            name="cs_shoulder_right"
            position={[0.5, 16.5, 0]}
            rotation={[-Math.PI, -Math.PI / 2, 0]}
            scale={1.04}
          />
          <group name="cs_sphere" position={[0.5, 2.5, 0]} scale={0.21} />
          <group name="cs_sphere_012" position={[3.5, 2.5, 0]} scale={0.21} />
          <group
            name="cs_square"
            position={[1.5, 1.5, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={0.15}
          />
          <group
            name="cs_square_2"
            position={[0.5, 1.5, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={0.15}
          />
          <group name="cs_thigh_fk" position={[0.5, 7.5, 0]} scale={0.82} />
          <group name="cs_toe" position={[0.5, 9.5, 0]} scale={0.43} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('../assets/models/Hero.gltf')
export default Hero
