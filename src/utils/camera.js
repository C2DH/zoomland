import { Vector3 } from 'three'

export const updateCamera = (
  camera,
  { radius = 2.5, elevation = 1.5, target, delta, angle, disable = false },
) => {
  if (disable) {
    return
  }
  // the position should take into account the angle
  const phi = -1 * (angle + Math.PI / 2)
  camera.position.lerp(
    new Vector3(
      target.x + radius * Math.cos(phi),
      target.y + elevation,
      target.z + radius * Math.sin(phi),
    ),
    delta * 2,
  )
  camera.lookAt(new Vector3(target.x, target.y + 1.5, target.z))
}
