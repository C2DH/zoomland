import { Html } from '@react-three/drei'
import { useWindowStore } from '../store'

const Book = ({ position, scale }) => {
  const [width, height] = useWindowStore((state) => [state.width, state.height])
  return (
    <group position={position} scale={scale} dispose={null}>
      <mesh>
        <Html center>
          <div
            style={{
              backgroundColor: 'white',
              height: height * 0.6,
              marginTop: -height * 0.4,
              width: width * 0.8,
              marginLeft: -width * 0.4,
              position: 'absolute',
            }}
          >
            Hello
          </div>
        </Html>
      </mesh>
    </group>
  )
}

export default Book
