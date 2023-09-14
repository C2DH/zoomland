import { useGLTF } from '@react-three/drei'
import { createContext } from 'react'

export const AnimationsContext = createContext([])

const Animations = ({ children }) => {
  const { animations } = useGLTF('../assets/models/Editor.glb')
  return <AnimationsContext.Provider value={[animations]}>{children}</AnimationsContext.Provider>
}

useGLTF.preload('../assets/models/Editor.glb')
export default Animations
