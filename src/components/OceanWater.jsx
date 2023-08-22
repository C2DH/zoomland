import React, { useRef } from 'react'
import { shaderMaterial } from '@react-three/drei'
import VertexShader from './Glsl/VertexShader.glsl'
import FragmentShader from './Glsl/FragmentShader.glsl'
import { extend, useFrame } from '@react-three/fiber'

console.log(VertexShader, 'VertexShader')

const OceanWaterMaterial = shaderMaterial(
  //Uniform
  { uTime: 0.0, wavesComplecity: 40.0 },
  //Vertex Shader
  VertexShader,
  //Fragment shader
  FragmentShader,
)
extend({ OceanWaterMaterial })

const OceanWater = () => {
  const mesh = useRef()
  const shaderMaterialRef = useRef()

  useFrame(({ clock }) => (shaderMaterialRef.current.uTime = clock.getElapsedTime() / 200))

  return (
    <mesh ref={mesh} position={[-3, 0, -3]}>
      <cylinderGeometry args={[20, 20, 0.1, 32]} />
      <oceanWaterMaterial ref={shaderMaterialRef}></oceanWaterMaterial>
      {/* <meshStandardMaterial roughness={0.3} color={'#31457C'} toneMapped={true} /> */}
    </mesh>
  )
}

export default OceanWater
