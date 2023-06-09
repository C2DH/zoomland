import React from 'react'
import { RigidBody } from '@react-three/rapier'

const Forest = ({ positions = [], maxScale = 2, scales = {}, children }) => {
  // generate random scales and rotations for each element in position index
  //

  return (
    <>
      {positions.map((position, index) => {
        const scale =
          position.length > 3 && typeof position[3] === 'object'
            ? position[3].scale
            : Math.random() * maxScale + 0.2
        const rotation = Math.random() * Math.PI * 2
        return (
          <React.Fragment key={index}>
            <RigidBody colliders="cuboid" position={position} scale={[1, 20, 1]} type="fixed">
              <mesh>
                <boxGeometry args={[0.6, 0.6, 0.6]} />
                <meshStandardMaterial color="blue" opacity={0} transparent></meshStandardMaterial>
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
