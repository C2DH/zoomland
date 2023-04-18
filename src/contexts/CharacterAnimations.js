import { createContext, useContext, useState } from 'react'

const CharacterAnimationsContext = createContext({})

export const CharacterAnimationsProvider = ({ animationIndex, children }) => {
  const [animations, setAnimations] = useState([])
  console.info('CharacterAnimationsProvider', animationIndex)
  return (
    <CharacterAnimationsContext.Provider
      value={{
        animationIndex,
        animations,
        setAnimations,
      }}
    >
      {children}
    </CharacterAnimationsContext.Provider>
  )
}

export const useCharacterAnimations = () => {
  return useContext(CharacterAnimationsContext)
}
