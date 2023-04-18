import World from './compontents/World'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">zoomland</header>
      <World width={window.innerWidth} height={window.innerHeight} />
    </div>
  )
}

export default App
