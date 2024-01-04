import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const SmallTree = (props) => {
  const treeRef = useRef()
  const { nodes, materials } = useGLTF('assets/models/SmallTree.glb')
  const seed = Math.random() + 0.8
  // Animate the tree
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const bendFactor = Math.sin(time * seed) * 0.3 + 0.3
    treeRef.current.rotation.z = bendFactor * 0.1
    treeRef.current.rotation.y = bendFactor * 0.15
  })
  return (
    <group {...props} dispose={null} ref={treeRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube030_1.geometry}
        material={materials['arbre tronc p']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube030_2.geometry}
        material={materials['arbre p02']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube030_3.geometry}
        material={materials['arbre p01']}
      />
    </group>
  )
}

useGLTF.preload('assets/models/SmallTree.glb')
export default SmallTree
