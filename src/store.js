import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
export const useWorldStore = create((set, get) => ({
  playerPosition: [0, 0, 0],
  setPlayerPosition: (playerPosition) => {
    const simplifiedPlayerPosition = [
      Math.round(playerPosition.x * 100) / 100,
      Math.round(playerPosition.y * 100) / 100,
      Math.round(playerPosition.z * 100) / 100,
    ]
    // change only if position is different
    const previousPlayerPosition = get().playerPosition
    if (simplifiedPlayerPosition.join(',') === previousPlayerPosition.join(',')) return
    console.debug('[store] setPlayerPosition:', simplifiedPlayerPosition)
    return set({ playerPosition: simplifiedPlayerPosition })
  },
}))
export const NumberOfChapters = 17
export const NumberOfQuests = 10
export const usePlayerStore = create(
  persist(
    (set, get) => ({
      progress: 0,
      isCollectingQuest: false,
      collectedQuests: [],
      collectQuest: (quest) => {
        console.debug('[store] collectQuest:', quest.id)
        const collectedQuests = get().collectedQuests
        const alreadyCollectedQuestIndex = collectedQuests.findIndex((q) => q.id === quest.id)
        if (alreadyCollectedQuestIndex > -1) {
          return set({
            isCollectingQuest: true,
            collectedQuests: collectedQuests.map((q, i) => {
              if (i !== alreadyCollectedQuestIndex) {
                return q
              }
              return {
                ...q,
                meetings: (q.meetings || []).concat(new Date().toISOString()),
              }
            }),
          })
        }
        return set({
          isCollectingQuest: true,
          collectedQuests: [...collectedQuests, quest],
        })
      },
      doneCollectingQuest: () => set({ isCollectingQuest: false }),
      resetCollectedQuests: () => set({ collectedQuests: [], isCollectingQuest: false }),
      isCollectingChapter: false,
      collectedChapters: [],
      currentCollectedChapter: null,
      collectChapter: (chapter) => {
        console.debug('[store] collectChapter:', chapter.id)
        const collectedChapters = get().collectedChapters
        const alreadyCollectedChapterIndex = collectedChapters.findIndex((c) => c.id === chapter.id)
        if (alreadyCollectedChapterIndex > -1) {
          return set({
            isCollectingChapter: true,
            currentCollectedChapter: chapter,
            collectedChapters: collectedChapters.map((d, i) => {
              if (i !== alreadyCollectedChapterIndex) {
                return d
              }
              return {
                ...d,
                readings: (d.readings || []).concat(new Date().toISOString()),
              }
            }),
          })
        }
        return set({
          isCollectingChapter: true,
          currentCollectedChapter: chapter,
          collectedChapters: [...collectedChapters, chapter],
          progress: (collectedChapters.length + 1) / NumberOfChapters,
        })
      },
      doneCollectingChapter: () =>
        set({ isCollectingChapter: false, currentCollectedChapter: null }),
      resetCollectedChapters: () =>
        set({
          progress: 0,
          collectedChapters: [],
          isCollectingChapter: false,
          currentCollectedChapter: null,
        }),
    }),
    {
      name: 'player-store',
    },
  ),
)

export const useWindowStore = create((set) => ({
  width: window.innerWidth,
  height: window.innerHeight,
  memo: [window.innerWidth, window.innerHeight].join('x'),
  updateDimensions: () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const memo = [width, height].join('x')
    console.debug('[store] updateDimensions', memo)
    return set({ width, height, memo })
  },
}))
