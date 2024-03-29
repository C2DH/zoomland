import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useQueueStore } from '../store/preload'
import { useEffect } from 'react'
import { MeshStandardMaterial } from 'three'

const Landscape = (props) => {
  const { nodes, materials } = useGLTF('assets/models/Landscape_2.glb')
  const addToLoaded = useQueueStore((state) => state.addToLoaded)

  useEffect(() => {
    let timer = setTimeout(() => {
      addToLoaded('Landscape')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const landMaterial = new MeshStandardMaterial({
    ...materials.Land,
    // side: FrontSide,
  })

  return (
    <>
      {/* {debug && <Debug />*/}
      <RigidBody type="fixed" colliders={'trimesh'} friction={2}>
        <group {...props} dispose={null}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Harbor.geometry}
            material={materials.Harbor}
            position={[9.121, 0.12, -1.451]}
            rotation={[0, 1.565, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Map.geometry}
            material={landMaterial}
            position={[0, 0.047, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text.geometry}
            material={materials.Zoomland}
            position={[-8.516, 6.093, -7.628]}
            rotation={[Math.PI / 2, 0, -0.918]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Bridge.geometry}
            material={materials['Bridge.002']}
            position={[6.228, 1.057, -0.867]}
            rotation={[-0.002, -0.002, 0.001]}
            scale={-0.348}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence022.geometry}
            material={materials.Fence}
            position={[-4.711, 1.122, 7.492]}
            rotation={[0, 0.475, 0]}
            scale={[0.246, 0.157, 0.252]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence023.geometry}
            material={materials['Fence.001']}
            position={[8.216, 0.295, -2.567]}
            rotation={[2.822, 1.116, -2.718]}
            scale={[0.251, 0.163, 0.21]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube009.geometry}
            material={materials.pierre}
            position={[8.271, 0.342, -0.758]}
            scale={[0.141, 0.281, 0.141]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence.geometry}
            material={materials.Fence}
            position={[-4.257, 1.114, 7.082]}
            rotation={[0, 1.255, 0]}
            scale={[0.201, 0.157, 0.201]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence001.geometry}
            material={materials.Fence}
            position={[-5.315, 0.265, 0.99]}
            rotation={[-0.076, -0.31, -0.435]}
            scale={[0.216, 0.169, 0.216]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence002.geometry}
            material={materials.Fence}
            position={[-5.619, 0.418, 0.941]}
            rotation={[-0.069, 0.002, -0.575]}
            scale={[0.249, 0.175, 0.216]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence003.geometry}
            material={materials.Fence}
            position={[-6.017, 0.688, 1.005]}
            rotation={[0, -0.132, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence004.geometry}
            material={materials.Fence}
            position={[8.866, 0.307, -3.553]}
            rotation={[0.348, 1.101, -0.214]}
            scale={[0.207, 0.162, 0.207]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence005.geometry}
            material={materials.Fence}
            position={[8.948, 0.329, -3.839]}
            rotation={[1.359, 1.434, -1.361]}
            scale={[0.207, 0.162, 0.207]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence006.geometry}
            material={materials.Fence}
            position={[8.962, 0.332, -4.209]}
            rotation={[1.359, 1.434, -1.361]}
            scale={[0.302, 0.162, 0.208]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence007.geometry}
            material={materials.Fence}
            position={[-4.595, 2.874, -5.414]}
            rotation={[0.197, 0.822, -0.149]}
            scale={[0.284, 0.153, 0.195]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence008.geometry}
            material={materials.Fence}
            position={[-4.832, 2.866, -5.159]}
            rotation={[0.197, 0.822, -0.149]}
            scale={[0.195, 0.153, 0.195]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence009.geometry}
            material={materials.Fence}
            position={[-5.111, 2.874, -4.962]}
            rotation={[0.154, 0.517, -0.08]}
            scale={[0.284, 0.153, 0.195]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence010.geometry}
            material={materials.Fence}
            position={[6.15, 2.238, -8.503]}
            rotation={[2.512, 1.027, -2.402]}
            scale={[0.258, 0.139, 0.178]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence011.geometry}
            material={materials.Fence}
            position={[4.774, 2.311, -8.794]}
            rotation={[-0.033, 0.068, -0.002]}
            scale={[0.199, 0.156, 0.199]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence012.geometry}
            material={materials.Fence}
            position={[4.442, 2.312, -8.771]}
            rotation={[-0.033, 0.068, -0.002]}
            scale={[0.258, 0.156, 0.2]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence013.geometry}
            material={materials.Fence}
            position={[-5.385, 2.885, -4.76]}
            rotation={[0.197, 0.822, -0.149]}
            scale={[0.195, 0.153, 0.195]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence014.geometry}
            material={materials.Fence}
            position={[-8.445, 1.136, 6.488]}
            rotation={[2.556, -1.328, 2.566]}
            scale={[0.276, 0.149, 0.19]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence015.geometry}
            material={materials.Fence}
            position={[8.851, 0.359, -4.618]}
            rotation={[3.043, 1.008, -2.931]}
            scale={[0.302, 0.162, 0.208]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence016.geometry}
            material={materials.Fence}
            position={[5.084, 2.315, -8.811]}
            rotation={[-0.034, -0.298, -0.014]}
            scale={[0.258, 0.156, 0.2]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence017.geometry}
            material={materials.Fence}
            position={[-5.617, 2.876, -4.587]}
            rotation={[0.143, 0.37, -0.056]}
            scale={[0.227, 0.153, 0.232]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence018.geometry}
            material={materials.Fence}
            position={[-4.418, 1.122, 7.318]}
            rotation={[Math.PI, -0.762, Math.PI]}
            scale={[0.201, 0.157, 0.201]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence019.geometry}
            material={materials.Fence}
            position={[-8.356, 1.136, 6.857]}
            rotation={[0.207, -0.866, 0.155]}
            scale={[0.276, 0.149, 0.19]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence020.geometry}
            material={materials.Fence}
            position={[-6.202, 0.81, 1.057]}
            rotation={[-0.013, 0.274, -0.619]}
            scale={[0.249, 0.175, 0.216]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fence021.geometry}
            material={materials.Fence}
            position={[-6.451, 0.994, 1.167]}
            rotation={[0.118, 0.605, -0.423]}
            scale={[0.249, 0.175, 0.216]}
          />
        </group>
      </RigidBody>
    </>
  )
}

useGLTF.preload('assets/models/Landscape.glb')

export default Landscape
