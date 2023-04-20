/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/models/Trump.gltf
Author: Denys Almaral (https://sketchfab.com/denysalmaral)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/lowpoly-trump-free-character-ba7b382c918b40e6b07011da4ff3ebc0
Title: LowPoly Trump Free Character
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Trump.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" position={[0, -226.42, -15.35]} rotation={[Math.PI / 2, 0, 0]}>
          <group name="4c6925bfbfe64fc7a4208f71a9751516fbx" rotation={[-Math.PI, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="trump_rigCharRoot">
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <group name="Object_33" />
                    <skinnedMesh name="Object_34" geometry={nodes.Object_34.geometry} material={materials.TrumpLPmat} skeleton={nodes.Object_34.skeleton} />
                  </group>
                </group>
                <group name="trump_lp_model" />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/Trump.gltf')
