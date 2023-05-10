import React from 'react'
import { RigidBody } from '@react-three/rapier'

const Forest = ({ positions = [], scales = {}, children }) => {
  // generate random scales and rotations for each element in position index
  //
  const randomScale = () => {
    return Math.random() * 2 + 0.2
  }
  const randomRotation = () => {
    return Math.random() * Math.PI * 2
  }

  return (
    <>
      {positions.map((position, index) => {
        const scale = Math.random() * 2 + 0.2
        const rotation = Math.random() * Math.PI * 2
        return (
          <React.Fragment key={index}>
            <RigidBody colliders="cuboid" position={position} scale={[1, 20, 1]} type="fixed">
              <mesh>
                <boxBufferGeometry args={[0.6, 0.6, 0.6]} />
                <meshStandardMaterial
                  color="transparent"
                  opacity={0}
                  transparent
                ></meshStandardMaterial>
              </mesh>
            </RigidBody>
            <group
              position={position}
              scale={scales[index] || [scale, scale, scale]}
              rotation={[0, rotation, 0]}
            >
              {children}
            </group>
          </React.Fragment>
        )
      })}
    </>
  )
}

export default Forest
