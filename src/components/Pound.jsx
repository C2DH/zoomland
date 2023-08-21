import React, { useRef } from 'react'
import { Plane, shaderMaterial } from '@react-three/drei'
// import VertexShader from './VertexShader'
import VertexShader from './Glsl/VertexShader.glsl'
import FragmentShader from './Glsl/FragmentShader.glsl'
import { extend, useFrame } from '@react-three/fiber'

console.log(VertexShader, 'VertexShader')

const WaveShaderMaterial = shaderMaterial(
  //Uniform
  { uTime: 0 },
  //Vertex Shader
  VertexShader,
  //Fragment shader
  FragmentShader,
)
extend({ WaveShaderMaterial })

const Pound = () => {
  const mesh = useRef()
  const shaderMaterialRef = useRef()

  useFrame(({ clock }) => (shaderMaterialRef.current.uTime = clock.getElapsedTime()))

  return (
    <Plane
      ref={mesh}
      args={[10, 10, 32, 32]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[10, -2.5, -32]}
      scale={[3.4, 2, 3]}
      // scale={[1, 1, 1]}
    >
      <waveShaderMaterial ref={shaderMaterialRef}></waveShaderMaterial>
    </Plane>
  )
}

export default Pound
