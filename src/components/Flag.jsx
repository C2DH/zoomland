import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { AnimationMixer } from 'three'

export function Flag(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('../assets/models/Flag.glb')

  console.log('ANIMATION', animations)
  useEffect(() => {
    const mixer = new AnimationMixer(group.current)

    // Find the desired animation clip
    const animationClip = animations.find((clip) => clip.name === 'KeyAction.004')

    if (animationClip) {
      const action = mixer.clipAction(animationClip)
      action.play()
    }

    return () => {
      mixer.stopAllAction()
    }
  }, [animations])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Plane" rotation={[0, 0, -Math.PI / 2]} scale={[0.78, 1.26, 1.93]}>
          <mesh
            name="Plane001"
            castShadow
            receiveShadow
            geometry={nodes.Plane001.geometry}
            material={materials.Flag}
            morphTargetDictionary={nodes.Plane001.morphTargetDictionary}
            morphTargetInfluences={nodes.Plane001.morphTargetInfluences}
          />
          <mesh
            name="Plane001_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane001_1.geometry}
            material={materials.Stick}
            morphTargetDictionary={nodes.Plane001_1.morphTargetDictionary}
            morphTargetInfluences={nodes.Plane001_1.morphTargetInfluences}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('../assets/models/Flag.glb')

export default Flag
