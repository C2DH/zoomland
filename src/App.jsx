import Vignette from './components/Vignette'
import World from './components/World'

function App() {
  return (
    <>
      <Vignette>
        <World width={window.innerWidth} height={window.innerHeight} />
      </Vignette>
    </>
  )
}

export default App
