import { create } from 'zustand'

const Expected = ['Landscape', 'IcescreamTruck']

export const useQueueStore = create((set, get) => ({
  loaded: [],
  isLoadingComplete: false,
  addToLoaded: (key) => {
    // if key is in loaded already, ignore
    const loaded = get().loaded
    if (loaded.includes(key)) return
    const isLoadingComplete = loaded.length + 1 === Expected.length
    console.debug(
      '[useQueueStore] addToLoaded:',
      key,
      'isLoadingComplete',
      isLoadingComplete,
      'time',
      new Date().getTime(),
    )
    if (isLoadingComplete) {
      console.debug('[useQueueStore] addToLoaded: all loaded')
      document.getElementById('loading').classList.add('hide')
    }
    return set({
      loaded: [...loaded, key],
      isLoadingComplete: loaded.length + 1 === Expected.length,
    })
  },
}))
