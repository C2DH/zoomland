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

export const NumberOfChapters = 17

export const usePlayerStore = create((set, get) => ({
  progress: 0,
  collectedChapters: [],
  collectChapter: (chapter) => {
    console.debug('[store] collectChapter:', chapter)
    const collectedChapters = get().collectedChapters
    if (collectedChapters.find((chapter) => chapter.id)) {
      console.debug('[store] collectChapter: already collected', chapter)
      return
    }
    set((state) => ({
      collectedChapters: [...state.collectedChapters, chapter],
    }))
  },
}))
