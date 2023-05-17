import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Object3D } from 'three'

const Clouds = ({ count = 100 }) => {
  const [o3d] = useState(() => new Object3D())
  const items = useRef()
  // instances contains initial position, rotation and scale of each cloud
  const instances = useMemo(() => {
    const instances = []
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 200 - 50
      const z = Math.random() * 200 - 50
      const y = Math.random() * 100 + 30
      instances.push({
        position: [x, y, z],
        rotation: [0, Math.random() * Math.PI * 2, 0],
        scale: Math.random() * 2 + 0.2,
        key: i,
      })
    }
    return instances
  }, [count])

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const mesh = items.current
    mesh.rotation.y = time / 100
  })

  useEffect(() => {
    const mesh = items.current

    for (var i = 0; i < instances.length; i++) {
      // we add 200 units of distance (the width of the section) between each.
      o3d.position.set(...instances[i].position)
      o3d.rotation.set(...instances[i].rotation)
      o3d.scale.set(instances[i].scale, instances[i].scale, instances[i].scale)
      o3d.updateMatrix()
      mesh.setMatrixAt(i, o3d.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  }, [count, instances])

  return (
    <instancedMesh ref={items} args={[null, null, count]}>
      <boxGeometry></boxGeometry>
      <meshStandardMaterial color="white"></meshStandardMaterial>
    </instancedMesh>
  )
}

export default Clouds
