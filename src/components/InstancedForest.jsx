import { Matrix4, Vector3, Quaternion } from 'three'
import { useEffect, useMemo, useRef } from 'react'
import { Gltf } from '@react-three/drei'
import { InstancedRigidBodies } from '@react-three/rapier'
/**
 * This component use instancedMesh to render a forest of trees.
 * Given the number of desired tree and an array of their positions,
 * it will render a forest of trees with random scale and rotation.
 */
const Forest = ({ treesCount = 200, children }) => {
  const trees = useRef()

  const instances = useMemo(() => {
    const instances = []

    for (let i = 0; i < treesCount; i++) {
      const x = Math.random() * 100 - 50
      const z = Math.random() * 100 - 50
      const y = Math.random() * 2
      instances.push({
        position: [x, y, z],
        rotation: [0, Math.random() * Math.PI * 2, 0],
        scale: Math.random() * 2 + 0.2,
        key: i,
      })
    }
    return instances
  }, [treesCount])
  console.debug('[Forest] transformations:', instances)
  return (
    <InstancedRigidBodies type="fixed" instances={instances} colliders="cuboid">
      <instancedMesh ref={trees} castShadow args={[null, null, treesCount]}>
        <boxGeometry></boxGeometry>
        <meshStandardMaterial color="green"></meshStandardMaterial>
      </instancedMesh>
    </InstancedRigidBodies>
  )
}
export default Forest
