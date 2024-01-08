import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useEffect } from 'react'
import { useQueueStore } from '../store/preload'

const IcescreamTruck = (props, transparent = true, geometryPosition = [0, 0, 0]) => {
  const { nodes, materials } = useGLTF('assets/models/IcescreamTruck.glb')
  const addToLoaded = useQueueStore((state) => state.addToLoaded)
  useEffect(() => {
    addToLoaded('IcescreamTruck')
  }, [])
  return (
    <RigidBody colliders={'hull'} type={'fixed'}>
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ice_Cream_Truck.geometry}
          material={materials['Ice Cream Truck Material']}
        />
      </group>
    </RigidBody>
  )
}

useGLTF.preload('assets/models/IcescreamTruck.glb')
export default IcescreamTruck
