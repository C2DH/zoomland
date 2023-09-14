import { useRef, useEffect } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'

export function Flag(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('../assets/models/Flag.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    actions['KeyAction.004'].play()
  }, [])
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
