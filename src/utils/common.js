import { FrontSide } from 'three'

export const debounce = (callback, wait) => {
  let timeoutId = null
  return (...args) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args)
    }, wait)
  }
}

export const getFrontSideMaterial = (material) => {
  material.side = FrontSide
  return material
}
