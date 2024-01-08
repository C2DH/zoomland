import { useState, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import instances from '../data/lawn'
import { Object3D, DoubleSide } from 'three'
import { useFrame } from '@react-three/fiber'

const Grass = (props) => {
  const count = instances.length
  const { nodes } = useGLTF('assets/models/Grass.glb')
  const [o3d] = useState(() => new Object3D())
  const items = useRef()

  useFrame(() => {
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
  })

  return (
    <group {...props} dispose={null}>
      <instancedMesh frustumCulled={false} ref={items} args={[nodes.Grass.geometry, null, count]}>
        <meshBasicMaterial side={DoubleSide} color="green" />
      </instancedMesh>
    </group>
  )
}
useGLTF.preload('assets/models/Grass.glb')
export default Grass
