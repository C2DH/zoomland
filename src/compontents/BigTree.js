import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { AnimationMixer, LoopRepeat } from 'three'

const BigTree = (props) => {
  const group = useRef()

  const { nodes, materials, animations } = useGLTF('./models/BigTree.gltf')
  const { actions, names } = useAnimations(animations, group)

  // in useEffect, loop the first animation
  useEffect(() => {
    console.debug('[BigTree] action names:', names)
    const action = actions[names[0]]
    action.play()
    return () => {
      action.stop()
    }
  }, [])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Mball016" rotation={[-0.15, 0, 0.08]} scale={[0.53, 0.29, 0.53]}>
          <mesh
            name="Mesh"
            castShadow
            receiveShadow
            geometry={nodes.Mesh.geometry}
            material={materials.Leafs}
            morphTargetDictionary={nodes.Mesh.morphTargetDictionary}
            morphTargetInfluences={nodes.Mesh.morphTargetInfluences}
          />
          <mesh
            name="Mesh_1"
            castShadow
            receiveShadow
            geometry={nodes.Mesh_1.geometry}
            material={materials.TreeTrunk}
            morphTargetDictionary={nodes.Mesh_1.morphTargetDictionary}
            morphTargetInfluences={nodes.Mesh_1.morphTargetInfluences}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/BigTree.gltf')
export default BigTree
