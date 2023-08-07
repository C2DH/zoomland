import { Float } from '@react-three/drei'
import Butterfly from './Butterfly'

const Butterflies = () => {
  return (
    <>
      <Float
        position={[8.84, 11.57, -65.72]}
        speed={5} // Animation speed, defaults to 1
        rotationIntensity={6} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[0, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Butterfly position={[5, 4, 0]} scale={0.06} />
        <Butterfly position={[0, 1, 0]} scale={0.05} rotation={[0.5, 0, 0]} />
        <Butterfly position={[0, 4, 3]} scale={0.04} rotation={[1, 0, 0]} />
      </Float>
      <Float
        position={[-54.18, 27.01, -47.67]}
        speed={10} // Animation speed, defaults to 1
        rotationIntensity={4} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[3, 5]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Butterfly position={[0, 2, 0]} scale={0.06} />
      </Float>
      <Float
        position={[-47.1, -0.52, -10.22]}
        speed={3} // Animation speed, defaults to 1
        rotationIntensity={4} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[3, 5]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Butterfly position={[-3, 2, 0]} scale={0.06} />
        <Butterfly position={[1, 1, -2]} scale={0.05} />
      </Float>
      <Float
        position={[-64.55, 9.6, 64.39]}
        speed={3} // Animation speed, defaults to 1
        rotationIntensity={4} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[3, 5]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Butterfly position={[5, 5, -10]} scale={0.06} />
      </Float>
      <Float
        position={[16.98, 9.5, 64.07]}
        speed={3} // Animation speed, defaults to 1
        rotationIntensity={4} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[3, 5]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Butterfly position={[-10, 3, 2]} scale={0.06} />
        <Butterfly position={[5, 4, 5]} scale={0.06} />
      </Float>
      <Float
        position={[61.32, 12.13, 76.26]}
        speed={3} // Animation speed, defaults to 1
        rotationIntensity={4} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[3, 5]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Butterfly position={[-2, 2, 2]} scale={0.06} />
      </Float>
      <Float
        position={[62.34, 10.99, -16.02]}
        speed={3} // Animation speed, defaults to 1
        rotationIntensity={10} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.3} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[1, 9]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Butterfly position={[0, 1, 0]} scale={0.06} />
      </Float>
      <Float
        position={[68.7, 10.79, 22.21]}
        speed={10} // Animation speed, defaults to 1
        rotationIntensity={7} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.3} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[1, 9]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Butterfly position={[-3, 0, 1]} scale={0.06} />
      </Float>
      <Float
        position={[31, 0.73, -0.4]}
        speed={10}
        rotationIntensity={7}
        floatIntensity={0.3}
        floatingRange={[1, 6]}
      >
        <Butterfly position={[0, 0, 1]} scale={0.05} />
        <Butterfly position={[1, 1, 1]} rotation={[1, 0, 0]} scale={0.06} />
      </Float>
    </>
  )
}

export default Butterflies
