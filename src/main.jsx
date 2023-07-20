import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Gameplay, Start, usePlayerStore } from './store/index.js'

const setIntroTimeout = () => {
  if (scene !== Gameplay) {
    usePlayerStore.setState({ scene: Start })
  }
  document.getElementById('loading').classList.add('hide')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

// get current scene from zustand non reactive fresh state
const scene = usePlayerStore.getState().scene

if (scene !== Gameplay) {
  setTimeout(setIntroTimeout, 6000)
} else {
  setTimeout(setIntroTimeout, 2000)
}
