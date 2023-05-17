import CollectedChapters from './components/CollectedChapters'
import Vignette from './components/Vignette'
import World from './components/World'

function App() {
  return (
    <>
      <CollectedChapters />
      <Vignette></Vignette>
      <World width={window.innerWidth} height={window.innerHeight} />
    </>
  )
}

export default App
