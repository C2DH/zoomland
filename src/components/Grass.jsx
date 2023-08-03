import { useEffect, useState, useRef } from 'react'
import { useGLTF, MeshDistortMaterial } from '@react-three/drei'
import instances from '../data/lawn'
import { Object3D, Vector3, DoubleSide } from 'three'
import { useFrame } from '@react-three/fiber'

const Grass = (props) => {
  const count = instances.length
  const { nodes, materials } = useGLTF('../assets/models/Grass.glb')
  const [o3d] = useState(() => new Object3D())
  const items = useRef()

  // const instances = nodes
  //   ? {
  //       Grass: nodes.Grass1001,
  //       Grass1: nodes.Grass2001,
  //       Grass2: nodes.Grass3001,
  //     }
  //   : null

  // useFrame((state, delta) => {
  //   const time = state.clock.getElapsedTime()
  //   const bendFactor = Math.sin(time * seed) * 0.2 + 0.2
  //   grassRef.current.rotation.z = bendFactor * 0.06
  //   grassRef.current.rotation.y = bendFactor * 0.06
  // })

  const seed = Math.random() + 0.8
  useFrame((state) => {
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

    mesh.castShadow = true
    mesh.receiveShadow = true
  })

  return (
    <group {...props} dispose={null}>
      <instancedMesh frustumCulled={false} ref={items} args={[nodes.Grass.geometry, null, count]}>
        <MeshDistortMaterial
          side={DoubleSide}
          color="green"
          distort={0.5}
          speed={1}
          factor={10}
        ></MeshDistortMaterial>
      </instancedMesh>
    </group>
  )
}
useGLTF.preload('../assets/models/Grass.glb')
export default Grass
