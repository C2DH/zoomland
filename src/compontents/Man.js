import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Man(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('./models/Man.glb')
  const { actions, names } = useAnimations(animations, group)

  console.log(names)
  // useEffect(() => {
  //   actions[names[1]].play()
  // }, [])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Man"
          castShadow
          receiveShadow
          geometry={nodes.Man.geometry}
          material={nodes.Man.material}
          position={[0, -0.3, 0]}
          rotation={[0, 0, 0]}
          scale={0.4}
        />
      </group>
    </group>
  )
}

useGLTF.preload('./models/Man.glb')

export default Man
