import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'

const BigTree = ({ debug = true, ...props }) => {
  const treeRef = useRef()
  const { nodes, materials } = useGLTF('../assets/models/BigTree.glb')
  const seed = Math.random() + 0.8
  // Animate the tree
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const bendFactor = Math.sin(time * seed) * 0.2 + 0.2
    treeRef.current.rotation.z = bendFactor * 0.06
    treeRef.current.rotation.y = bendFactor * 0.06
  })
  return (
    <group {...props} dispose={null} ref={treeRef}>
      <RigidBody type={'fixed'} colliders={'hull'}>
        <mesh position={[0, 0, 0]} rotation={[0, -0.01, 0]}>
          <boxGeometry args={[0, 3.2, 0.6]} />
          <meshStandardMaterial color="green" transparent={!debug} opacity={debug ? 1 : 0} />
        </mesh>
      </RigidBody>
      <mesh castShadow receiveShadow geometry={nodes.BigTree.geometry} material={materials.Leafs} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BigTree_1.geometry}
        material={materials.TreeTrunk}
      />
    </group>
  )
}

useGLTF.preload('../assets/models/BigTree.glb')
export default BigTree
