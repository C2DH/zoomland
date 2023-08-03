import { useEffect, useState, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import instances from '../data/Mushrooms'
import { Object3D, MeshDepthMaterial, RGBADepthPacking } from 'three'

const Mushrooms = (props) => {
  const count = instances.length
  const { nodes, materials } = useGLTF('../assets/models/Mushroom.glb')
  const [o3d] = useState(() => new Object3D())
  const items = useRef()

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
    mesh.castShadow = true
    mesh.receiveShadow = true
  }, [])

  return (
    <group {...props} dispose={null}>
      <instancedMesh
        castShadow
        receiveShadow
        frustumCulled={false}
        ref={items}
        args={[nodes.Mushroom.geometry, materials['champi rouge tige'], count]}
      ></instancedMesh>
    </group>
  )
}
useGLTF.preload('../assets/models/Mushroom.glb')
export default Mushrooms
