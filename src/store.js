import { create } from 'zustand'
export const AnimationIdle = 'idle'
export const AnimationWalk = 'walk'
export const AnimationRun = 'run'
export const AnimationJump = 'jump'

export const useAnimationStore = create((set, get) => ({
  animation: AnimationIdle,
  previousAnimation: null,
  setAnimation: (animation) => {
    // change only if animation is different
    const previousAnimation = get().animation
    if (animation === previousAnimation) return

    console.debug('[store] setAnimation:', animation)
    return set({
      animation,
      previousAnimation,
    })
  },
}))

// const usePlayerStore = create((set) => ({

// }))
