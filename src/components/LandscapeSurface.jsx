import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js'

const LandscapeSurface = ({ children, instances, amount = 100 }) => {
  const objects = useRef()

  useEffect(() => {
    if (objects.current && objects.current.children[0] && instances.current) {
      const sampler = new MeshSurfaceSampler(objects.current.children[0]).build()

      for (let i = 0; i < amount; i++) {
        sampler.setWeightAttribute('_mushrooms')
        sampler.sample(_position, _normal)
        sampler.build(_position, _normal)
        _normal.add(_position)

        dummy.position.copy(_position)
        dummy.lookAt(_normal)
        dummy.updateMatrix()

        instances.current.setMatrixAt(i, dummy.matrix)
      }
      instances.current.instanceMatrix.needsUpdate = true
      objects.current.add(instances.current)
    }
  }, [instances, amount])

  return <group ref={objects}>{children}</group>
}
