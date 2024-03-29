import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MeshStandardMaterial, Object3D } from 'three'

const Clouds = ({ count = 30 }) => {
  const [o3d] = useState(() => new Object3D())
  const { nodes } = useGLTF('assets/models/Cloud.glb')
  const items = useRef()

  const cloudMaterial = new MeshStandardMaterial({
    transparent: true,
    depthWrite: false,
    opacity: 0.7,
  })

  const instances = useMemo(() => {
    const instances = []
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 400 - 200
      const z = Math.random() * 400 - 200
      const y = Math.random() * 100 + 30
      instances.push({
        position: [x, y, z],
        rotation: [0, Math.random() * Math.PI * 2, 0],
        scale: Math.random() * 12 + 0.6,
        key: i,
      })
    }
    return instances
  }, [count])

  useFrame((state) => {
    if (!items.current) return
    const time = state.clock.getElapsedTime()
    const mesh = items.current
    mesh.rotation.y = time / 100
  })

  useEffect(() => {
    if (!items.current) return
    const mesh = items.current

    for (var i = 0; i < instances.length; i++) {
      o3d.position.set(...instances[i].position)
      o3d.rotation.set(...instances[i].rotation)
      o3d.scale.set(instances[i].scale, instances[i].scale, instances[i].scale)
      o3d.updateMatrix()
      mesh.setMatrixAt(i, o3d.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  }, [count, instances])

  return (
    <instancedMesh
      frustumCulled={false}
      ref={items}
      args={[nodes.Icosphere001.geometry, cloudMaterial, count]}
    ></instancedMesh>
  )
}
useGLTF.preload('assets/models/Cloud.glb')
export default Clouds
