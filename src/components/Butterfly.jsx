import { useRef, useEffect, useState } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { MeshStandardMaterial, DoubleSide } from 'three'

const colors = ['#da5df9', '#f95dca', '#f95d7c', '#f98c5d', '#f9da5d']

export function Butterfly(props, color = { color }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('assets/models/Butterfly.glb')
  const { actions } = useAnimations(animations, group)

  const [currentColor, setCurrentColor] = useState(colors[0])

  useFrame(() => {
    // Update animations
    Object.values(actions).map((action) => {
      action.play()
      return null
    })
  })

  const pickRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    setCurrentColor(colors[randomIndex])
  }

  useEffect(() => {
    pickRandomColor()
    return () => {}
  }, [setCurrentColor])

  const wingMaterial = new MeshStandardMaterial({
    ...materials.Fabric,
    color: currentColor,
    side: DoubleSide,
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Body"
          castShadow
          receiveShadow
          geometry={nodes.Body.geometry}
          material={materials.Body}
          rotation={[-Math.PI / 4, 0, 0]}
          scale={[0.86, 0.279, 0.279]}
        />
        <mesh
          name="Left_wing"
          castShadow
          receiveShadow
          geometry={nodes.Left_wing.geometry}
          material={wingMaterial}
          position={[0.159, -0.002, -0.269]}
          rotation={[1.222, 0, Math.PI]}
          scale={-1}
        />
        <mesh
          name="Right_wing"
          castShadow
          receiveShadow
          geometry={nodes.Right_wing.geometry}
          material={wingMaterial}
          position={[0.159, -0.002, 0.269]}
          rotation={[-1.222, 0, 0]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('assets/models/Butterfly.glb')

export default Butterfly
