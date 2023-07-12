import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

const Waves = (props) => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('../assets/models/Waves.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    actions['KeyAction.002'].play()
  }, [])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Waves"
          castShadow
          receiveShadow
          geometry={nodes.Waves.geometry}
          material={materials.Glass}
          morphTargetDictionary={nodes.Waves.morphTargetDictionary}
          morphTargetInfluences={nodes.Waves.morphTargetInfluences}
        />
      </group>
    </group>
  )
}

useGLTF.preload('../assets/models/Waves.glb')
export default Waves
