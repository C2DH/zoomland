import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MaxCollectedChapters } from '../constants'

export const AnimationIdle = 'idle'
export const AnimationWalk = 'walk'
export const AnimationRun = 'run'
export const AnimationJump = 'jump'
export const DefaultPlayerPosition = [94.44, 0.26, -13.71]
export const DefaultPlayerAngle = -Math.PI / 2
export const DefaultJoystick = {
  moveForward: false,
  moveBackward: false,
  moveLeft: false,
  moveRight: false,
  jump: false,
  sprint: false,
  speedCoeff: 0,
}
export const useAnimationStore = create((set, get) => ({
  animation: AnimationIdle,
  previousAnimation: null,
  setAnimation: (animation) => {
    // change only if animation is different
    const previousAnimation = get().animation
    if (animation === previousAnimation) return
    // console.debug('[store] setAnimation:', animation)
    return set({
      animation,
      previousAnimation,
    })
  },
}))

export const useWorldStore = create((set, get) => ({
  elapsedTime: 0,
  resetElapsedTime: () => set({ elapsedTime: 0 }),
  playerPosition: DefaultPlayerPosition,
  playerAngle: DefaultPlayerAngle,
  cameraOffset: {
    radius: 2.5,
    elevation: 1.5,
    followPlayer: false,
  },
  // joystick: [DefaultPlayerAngle, 0],
  joystick: DefaultJoystick,
  setJoystick: (d) => {
    return set({
      joystick: d || DefaultJoystick,
    })
  },
  // change only if angle is different
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
  // setJoystick: (angle, speed) => {
  //   if (isNaN(angle)) {
  //     const previousPlayerAngle = get().playerAngle
  //     return set({ joystick: [previousPlayerAngle, 0] })
  //   }
  //   return set({
  //     playerAngle: angle,
  //     joystick: [angle, speed],
  //   })
  // },
  setCameraOffset: ({ radius, elevation, followPlayer }) =>
    set({ cameraOffset: { radius, elevation, followPlayer } }),
  // change only if angle is different
  setPlayerAngle: (playerAngle) => {
    // change only if angle is different
    const previousPlayerAngle = get().playerAngle
    if (playerAngle === previousPlayerAngle) return
    // console.debug('[store] setPlayerAngle:', playerAngle)
    return set({ playerAngle })
  },
  saveInitialPropsToPlayerStore: () => {
    const { playerPosition, playerAngle, elapsedTime } = get()
    console.debug('[store] saveInitialPropsToPlayerStore!', {
      playerPosition,
      playerAngle,
      elapsedTime,
    })
    usePlayerStore.getState().setInitialProps({
      initialPlayerPosition: playerPosition,
      initialPlayerAngle: playerAngle,
      initialElapsedTime: elapsedTime,
    })
  },
}))
export const NumberOfQuests = 10

export const Gameplay = 'gameplay'
export const OpenSea = 'opensea'
export const Start = 'start'
export const Baloon = 'baloon'
export const SceneCredits = 'credits'
export const SceneFakeBook = 'fakebook'
export const SceneEnding = 'ending'

export const usePlayerStore = create(
  persist(
    (set, get) => ({
      progress: 0,
      scene: OpenSea,
      setScene: (scene) => set({ scene }),
      isObservingLandscape: false,
      isCollectingQuest: false,
      collectedQuests: [],
      latestCollectedQuest: null,
      initialElapsedTime: 0,
      initialPlayerPosition: DefaultPlayerPosition,
      initialPlayerAngle: DefaultPlayerAngle,
      setInitialProps: ({ initialPlayerPosition, initialPlayerAngle, initialElapsedTime }) => {
        console.debug('[store] setInitialPlayerProps:', initialPlayerPosition, initialPlayerAngle)
        return set({
          initialPlayerPosition,
          initialPlayerAngle,
          initialElapsedTime,
        })
      },
      observeLandscape: (isObservingLandscape) =>
        set({
          isObservingLandscape,
        }),
      collectQuest: (quest) => {
        const collectedQuests = get().collectedQuests
        const alreadyCollectedQuestIndex = collectedQuests.findIndex((q) => q.id === quest.id)
        console.debug(
          '[store] collectQuest:',
          quest.id,
          alreadyCollectedQuestIndex,
          collectedQuests,
        )
        if (alreadyCollectedQuestIndex > -1) {
          const updatedQuest = {
            ...quest,
            meetings: (collectedQuests[alreadyCollectedQuestIndex].meetings || []).concat(
              new Date().toISOString(),
            ),
          }
          return set({
            isCollectingQuest: true,
            latestCollectedQuest: updatedQuest,
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
          latestCollectedQuest: quest,
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
          progress: (collectedChapters.length + 1) / MaxCollectedChapters,
        })
      },
      doneCollectingChapter: () => {
        const collectedChapters = get().collectedChapters
        if (collectedChapters.length === MaxCollectedChapters) {
          set({ scene: SceneEnding, isCollectingChapter: false, currentCollectedChapter: null })
        } else {
          set({ isCollectingChapter: false, currentCollectedChapter: null })
        }
      },
      resetCollectedChapters: () =>
        set({
          progress: 0,
          collectedChapters: [],
          isCollectingChapter: false,
          currentCollectedChapter: null,
        }),
      newGame: () => {
        useWorldStore.setState({ elapsedTime: 0 })
        set({
          initialElapsedTime: 0,
          progress: 0,
          collectedChapters: [],
          isCollectingChapter: false,
          currentCollectedChapter: null,
          collectedQuests: [],
          isCollectingQuest: false,
          latestCollectedQuest: null,
          scene: SceneFakeBook,
        })
      },
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

export const MenuClosed = 'closed'
export const MenuOpen = 'open'

export const useMenuStore = create((set) => ({
  menuStatus: MenuClosed,
  setMenuStatus: (menuStatus) => set({ menuStatus }),
  gameControlsStatus: MenuClosed,
  setGameControlsStatus: (gameControlsStatus) => set({ gameControlsStatus }),
}))

export const useGlitchStore = create((set) => ({
  globalGlitchClass: '',
  setGlobalGlitchClass: (newClass) => set({ globalGlitchClass: newClass }),
}))
