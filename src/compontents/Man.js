import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useCharacterAnimations } from '../contexts/CharacterAnimations'

const Man = (props) => {
  const group = useRef()
  const { nodes, animations } = useGLTF('./models//Man.gltf')
  const { setAnimations, animationIndex } = useCharacterAnimations()
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    setAnimations(names)
  }, [names])

  useEffect(() => {
    console.debug('actions: ', actions)
    actions[names[7]].reset().fadeIn(0.5).play()
    return () => {
      actions[names[7]].fadeOut(0.5)
    }
  }, [animationIndex])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="cs_arm_fk" position={[1.5, 8.5, 0]} scale={0.82} />
        <group name="cs_calf_fk" position={[0.5, 8.5, 0]} scale={0.82} />
        <group name="cs_circle" position={[0.5, 4.5, 0]} scale={0.21} />
        <group name="cs_circle001" position={[0.5, 4.5, 0]} scale={0.21} />
        <group name="cs_circle_025" position={[2.5, 4.5, 0]} scale={0.21} />
        <group name="cs_foot" position={[0.5, 10.5, 0]} rotation={[-Math.PI, 0, 0]} scale={0.31} />
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
        <group name="cs_foot_01" position={[0.5, 18.5, 0]} rotation={[0, 1.57, 0]} scale={2.19} />
        <group name="cs_foot_roll" position={[0.5, 12.5, 0]} scale={0.59} />
        <group name="cs_forearm_fk" position={[2.5, 8.5, 0]} scale={0.82} />
        <group name="cs_hand" position={[0.5, 19.5, 0]} rotation={[-Math.PI, 0, 0]} scale={0.31} />
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
        <group name="cs_square" position={[1.5, 1.5, 0]} rotation={[-Math.PI, 0, 0]} scale={0.15} />
        <group
          name="cs_square_2"
          position={[0.5, 1.5, 0]}
          rotation={[-Math.PI, 0, 0]}
          scale={0.15}
        />
        <group name="cs_thigh_fk" position={[0.5, 7.5, 0]} scale={0.82} />
        <group name="cs_toe" position={[0.5, 9.5, 0]} scale={0.43} />
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
          <skinnedMesh
            name="Man"
            geometry={nodes.Man.geometry}
            material={nodes.Man.material}
            skeleton={nodes.Man.skeleton}
          />
        </group>
        <group name="cs_grp">
          <group name="cs_arm_fk001" position={[1.5, 8.5, 0]} scale={0.82} />
          <group name="cs_calf_fk001" position={[0.5, 8.5, 0]} scale={0.82} />
          <group name="cs_circle002" position={[0.5, 4.5, 0]} scale={0.21} />
          <group name="cs_circle003" position={[0.5, 4.5, 0]} scale={0.21} />
          <group name="cs_circle_025001" position={[2.5, 4.5, 0]} scale={0.21} />
          <group
            name="cs_foot003"
            position={[0.5, 10.5, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={0.31}
          />
          <group
            name="cs_foot004"
            position={[0.5, 10.5, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={0.31}
          />
          <group
            name="cs_foot005"
            position={[0.5, 10.5, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={0.31}
          />
          <group
            name="cs_foot_01001"
            position={[0.5, 18.5, 0]}
            rotation={[0, 1.57, 0]}
            scale={2.19}
          />
          <group name="cs_foot_roll001" position={[0.5, 12.5, 0]} scale={0.59} />
          <group name="cs_forearm_fk001" position={[2.5, 8.5, 0]} scale={0.82} />
          <group
            name="cs_hand001"
            position={[0.5, 19.5, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={0.31}
          />
          <group name="cs_head001" position={[0.5, 13.5, 0]} scale={0.21} />
          <group name="cs_hips001" position={[0.5, 11.5, 0]} scale={0.21} />
          <group name="cs_master001" position={[0.5, 17.5, 0]} scale={0.1} />
          <group name="cs_neck001" position={[0.5, 14.5, 0]} scale={0.21} />
          <group
            name="cs_shoulder_left001"
            position={[0.5, 15.5, 0]}
            rotation={[-Math.PI, -Math.PI / 2, 0]}
            scale={1.04}
          />
          <group
            name="cs_shoulder_right001"
            position={[0.5, 16.5, 0]}
            rotation={[-Math.PI, -Math.PI / 2, 0]}
            scale={1.04}
          />
          <group name="cs_sphere001" position={[0.5, 2.5, 0]} scale={0.21} />
          <group name="cs_sphere_012001" position={[3.5, 2.5, 0]} scale={0.21} />
          <group
            name="cs_square001"
            position={[1.5, 1.5, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={0.15}
          />
          <group
            name="cs_square_2001"
            position={[0.5, 1.5, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={0.15}
          />
          <group name="cs_thigh_fk001" position={[0.5, 7.5, 0]} scale={0.82} />
          <group name="cs_toe001" position={[0.5, 9.5, 0]} scale={0.43} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./models/Man.gltf')

export default Man
