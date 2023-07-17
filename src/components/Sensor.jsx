import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { usePlayerStore } from '../store'

const Sensor = ({
  width = 2,
  height = 2,
  depth = 2,
  debug = false,
  onIntersectionEnter,
  onIntersectionExit,
  ...props
}) => {
  const observeLandscape = usePlayerStore((state) => state.observeLandscape)

  const handleIntersectionEnter = (e) => {
    console.log('[Sensor] handleIntersectionEnter')
    observeLandscape(true)
    if (typeof onIntersectionEnter === 'function') {
      onIntersectionEnter(e)
    }
  }

  const handleIntersectionExit = () => {
    console.log('[Sensor] handleIntersectionExit')
    observeLandscape(false)
    onIntersectionExit && onIntersectionExit()
  }
  return (
    <group {...props} dispose={null}>
      {debug && (
        <mesh>
          <boxGeometry args={[width, height, depth]}></boxGeometry>
          <meshStandardMaterial color="green"></meshStandardMaterial>
        </mesh>
      )}
      <RigidBody type="fixed">
        <mesh position={[0, -200, 0]}>
          <boxGeometry args={[1, 1, 1]}></boxGeometry>
          <meshStandardMaterial color="gold"></meshStandardMaterial>
        </mesh>
        <CuboidCollider
          sensor
          position={[0, 0, 0]}
          args={[width, height, depth]}
          onIntersectionExit={handleIntersectionExit}
          onIntersectionEnter={handleIntersectionEnter}
        ></CuboidCollider>
      </RigidBody>
    </group>
  )
}

export default Sensor

// sensor
// onIntersectionEnter={() => setIntersection(true)}
// onIntersectionExit={() => setIntersection(false)}
