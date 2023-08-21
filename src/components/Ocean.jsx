import { useGLTF } from '@react-three/drei'
// import { shaderMaterial } from '@react-three/drei'
// // import VertexShader from './VertexShader'
// import VertexShader from './Glsl/VertexShader.glsl'
// import FragmentShader from './Glsl/FragmentShader.glsl'
// import { extend, useFrame } from '@react-three/fiber'
// import React, { useRef } from 'react'

// const WaveShaderMaterial = shaderMaterial(
//   //Uniform
//   { uTime: 0 },
//   //Vertex Shader
//   VertexShader,
//   //Fragment shader
//   FragmentShader,
// )
// extend({ WaveShaderMaterial })

const Ocean = (props) => {
  const { nodes, materials } = useGLTF('../assets/models/Ocean.glb')
  // const shaderMaterialRef = useRef()
  // useFrame(({ clock }) => (shaderMaterialRef.current.uTime = clock.getElapsedTime()))
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ocean.geometry}
        material={materials.Material}
        position={[0, 0.04, 0]}
      />
      {/* <waveShaderMaterial ref={shaderMaterialRef} /> */}
    </group>
  )
}

useGLTF.preload('../assets/models/Ocean.glb')
export default Ocean
