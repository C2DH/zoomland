import { RigidBody } from '@react-three/rapier'

const Platform = {
  position: [95, -0.13, -15.404151916503906],
  size: [22.0, 0.7, 8],
}

const PlatformWallNorth = {
  position: [96, -0.05, -15.404151916503906],
  size: [1.0, 7, 8],
}

const PlatformWallEast = {
  position: [97, -0.05, -11.5],
  size: [20.0, 7, 0.1],
}

const PlatformWallWest = {
  position: [95, -0.05, -17.7],
  size: [20.0, 7, 0.1],
}

const HarbourWallEast = {
  position: [86.5, 0, -1.55],
  size: [1.0, 7, 20],
}
const HarbourWallWest = {
  position: [85.4, 0, -22.7],
  rotation: [0, -0.1, 0],
  size: [0.1, 7, 10],
}
const HarbourBottom = {
  position: [94, 0.1, -14.9],
  rotation: [0, 0, 1.58],
  size: [0.1, 9, 7],
}
/**
 * Create a lot of very simple rigidbodies to be used as
 * boundaries for the game.
 */
const Boundaries = ({ debug = false }) => {
  return [
    Platform,
    PlatformWallNorth,
    PlatformWallWest,
    PlatformWallEast,
    HarbourWallEast,
    HarbourWallWest,
    HarbourBottom,
  ].map((b, i) => (
    <RigidBody
      key={i}
      position={b.position}
      rotation={b.rotation}
      colliders={'cuboid'}
      type={'fixed'}
    >
      <mesh>
        <boxGeometry args={b.size} />
        <meshStandardMaterial
          depthWrite={false}
          transparent={!debug}
          opacity={debug ? 1 : 0}
          color={'red'}
        />
      </mesh>
    </RigidBody>
  ))
}

export default Boundaries
