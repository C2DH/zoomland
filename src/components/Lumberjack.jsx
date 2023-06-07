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

const Lumberjack = (props) => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('../assets/models/Lumberjack.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    actions['Lumberjack2'].play()
  }, [])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Lumberjack"
          castShadow
          receiveShadow
          geometry={nodes.Lumberjack.geometry}
          material={materials['Material.001']}
          morphTargetDictionary={nodes.Lumberjack.morphTargetDictionary}
          morphTargetInfluences={nodes.Lumberjack.morphTargetInfluences}
        />
      </group>
    </group>
  )
}

useGLTF.preload('../assets/models/Lumberjack.glb')

export default Lumberjack
