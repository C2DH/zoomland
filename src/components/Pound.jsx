import React, { useRef } from 'react'
import { Plane } from '@react-three/drei'
import VertexShader from './VertexShader'
import FragmentShader from './FragmentShader'

const Pound = () => {
  const mesh = useRef()

  return (
    <Plane
      ref={mesh}
      args={[10, 10]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[10, -2.5, -32]}
      scale={[3.4, 2, 3]}
    >
      <shaderMaterial vertexShader={VertexShader} fragmentShader={FragmentShader}></shaderMaterial>
    </Plane>
  )
}

export default Pound
