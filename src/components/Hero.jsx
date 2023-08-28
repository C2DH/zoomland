import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import {
  AnimationIdle,
  AnimationRun,
  AnimationWalk,
  AnimationJump,
  useAnimationStore,
} from '../store'
import { MeshStandardMaterial } from 'three'
import { useTexture } from '@react-three/drei'

const Hero = (props) => {
  const dressTexture = useTexture('../assets/tex/dress.png')
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('../assets/models/Hero.glb')
  const { actions, names } = useAnimations(animations, group)
  // remap animation names to current const
  const mappedActions = {
    [AnimationIdle]: actions['idle'],
    [AnimationRun]: actions['runnig'], // sic
    [AnimationWalk]: actions['walking'],
    [AnimationJump]: actions['jumping'],
  }

  const [animation, previousAnimation] = useAnimationStore((state) => [
    state.animation,
    state.previousAnimation,
  ])

  const skirtMaterial = new MeshStandardMaterial({
    ...materials.Skirt,
    color: null,
    map: dressTexture,
    roughness: 1,
    metalness: 1,
    emissive: '#000000',
  })

  const headtMaterial = new MeshStandardMaterial({
    ...materials.Head,
    color: '#ee8600',
  })

  const skinMaterial = new MeshStandardMaterial({
    ...materials.Skin,
    color: '#b88160',
    metalness: 0.5,
    roughness: 1,
  })

  useEffect(() => {
    const action = mappedActions[animation]
    // console.debug('[Hero] animation changed:', animation)
    if (previousAnimation) {
      const previousAction = mappedActions[previousAnimation]
      if (previousAction) {
        previousAction.fadeOut(0.5)
      }
    }
    if (action) {
      action.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(0.5).play()
    }
  }, [actions, animation, previousAnimation])
  useEffect(() => {
    actions['idle'].play()
  }, [])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <group name="girl">
            <skinnedMesh
              name="Mesh"
              geometry={nodes.Mesh.geometry}
              material={skinMaterial}
              skeleton={nodes.Mesh.skeleton}
              castShadow
              receiveShadow
              toneMapped={true}
            />
            <skinnedMesh
              name="Mesh_1"
              geometry={nodes.Mesh_1.geometry}
              material={skirtMaterial}
              skeleton={nodes.Mesh_1.skeleton}
              castShadow
              receiveShadow
              toneMapped={true}
            />
            <skinnedMesh
              name="Mesh_2"
              geometry={nodes.Mesh_2.geometry}
              material={headtMaterial}
              skeleton={nodes.Mesh_2.skeleton}
              castShadow
              receiveShadow
              toneMapped={true}
            />
          </group>
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
        <group name="cs_grp">
          <group name="cs_arm_fk" position={[1.5, 8.5, 0]} scale={0.822} />
          <group name="cs_calf_fk" position={[0.5, 8.5, 0]} scale={0.822} />
          <group name="cs_circle" position={[0.5, 4.5, 0]} scale={0.206} />
          <group
            name="cs_foot"
            position={[0.5, 10.5, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={0.308}
          />
          <group
            name="cs_foot001"
            position={[0.5, 10.5, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={0.308}
          />
          <group
            name="cs_foot002"
            position={[0.5, 10.5, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={0.308}
          />
          <group
            name="cs_foot_01"
            position={[0.5, 18.5, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={2.186}
          />
          <group name="cs_foot_roll" position={[0.5, 12.5, 0]} scale={0.592} />
          <group name="cs_forearm_fk" position={[2.5, 8.5, 0]} scale={0.822} />
          <group
            name="cs_hand"
            position={[0.5, 19.5, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={0.308}
          />
          <group name="cs_head" position={[0.5, 13.5, 0]} scale={0.206} />
          <group name="cs_hips" position={[0.5, 11.5, 0]} scale={0.206} />
          <group name="cs_master" position={[0.5, 17.5, 0]} scale={0.1} />
          <group name="cs_neck" position={[0.5, 14.5, 0]} scale={0.206} />
          <group
            name="cs_shoulder_left"
            position={[0.5, 15.5, 0]}
            rotation={[-Math.PI, -Math.PI / 2, 0]}
            scale={1.038}
          />
          <group
            name="cs_shoulder_right"
            position={[0.5, 16.5, 0]}
            rotation={[-Math.PI, -Math.PI / 2, 0]}
            scale={1.038}
          />
          <group name="cs_sphere" position={[0.5, 2.5, 0]} scale={0.206} />
          <group name="cs_sphere_012" position={[3.5, 2.5, 0]} scale={0.206} />
          <group
            name="cs_square"
            position={[1.5, 1.497, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={0.154}
          />
          <group
            name="cs_square_2"
            position={[0.5, 1.497, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={0.154}
          />
          <group name="cs_thigh_fk" position={[0.5, 7.5, 0]} scale={0.822} />
          <group name="cs_toe" position={[0.5, 9.5, 0]} scale={0.429} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('../assets/models/Hero.glb')
export default Hero
