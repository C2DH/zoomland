import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { MeshStandardMaterial, DoubleSide } from 'three'

const BirdEyeViewSign = ({
  animation = true,
  transparent = false,
  opacity = '1',
  color,
  ...props
}) => {
  const signRef = useRef()
  const { nodes, materials } = useGLTF('assets/models/BirdEyeViewSign.glb')
  const seed = 0.8
  // Animate the tree
  useFrame((state) => {
    if (animation === true) {
      const time = state.clock.getElapsedTime()
      const positionFactor = Math.sin(time * seed) * 0.1
      signRef.current.position.y = 0.5 + positionFactor
      signRef.current.rotation.y += 0.005
    }
  })

  //Pick color - Media #fa953b, History - #306fc5, Hermeneutics - #9e43c8, Digital landscapes - #ed407d, Intro - #7c7c7c
  const signColor = new MeshStandardMaterial({
    ...materials.Media,
    color: color,
    opacity: opacity,
    transparent: transparent,
  })
  const signBodyColor = new MeshStandardMaterial({
    ...materials.Media,
    color: '#FFFFFF',
    opacity: opacity,
    transparent: transparent,
    side: DoubleSide,
  })

  return (
    <group ref={signRef} {...props} dispose={null}>
      <group name="Scene">
        <group name="Circle003">
          <mesh
            name="Circle003_1"
            castShadow
            receiveShadow
            geometry={nodes.Circle003_1.geometry}
            material={signBodyColor}
          />
          <mesh
            name="Circle003_2"
            castShadow
            receiveShadow
            geometry={nodes.Circle003_2.geometry}
            material={signColor}
          />
          <mesh
            name="Circle003_3"
            castShadow
            receiveShadow
            geometry={nodes.Circle003_3.geometry}
            material={signColor}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('assets/models/BirdEyeViewSign.glb')
export default BirdEyeViewSign
