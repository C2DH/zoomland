import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

const {
  REACT_APP_GIT_TAG = '',
  REACT_APP_GIT_BRANCH = '',
  REACT_APP_GIT_REVISION = '',
  REACT_APP_GIT_REMOTE = '',
} = process.env
// transfor the remote url, e.g. git@github.com:C2DH/zoomland.git to a link to the repo
const ReactGitRepoUrl = REACT_APP_GIT_REMOTE.replace(
  /git@github.com:([a-zA-Z]+\/[a-zA-Z]+).*$/,
  (m, p1) => `https://github.com/${p1}/commit/${REACT_APP_GIT_REVISION}`
)
// add information on version on startup.
console.info(
  'version',
  REACT_APP_GIT_TAG,
  REACT_APP_GIT_BRANCH,
  ReactGitRepoUrl
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
