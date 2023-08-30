import { SceneCredits, usePlayerStore } from '../store'
import './Credits.css'

const Credits = () => {
  const scene = usePlayerStore((state) => state.scene)
  if (scene !== SceneCredits) return null
  return (
    <div className="Credits">
      <div className="Credits__content">
        {/* this is scrolling automatically */}
        <h2 className="text-center">Thank you for your love and support! </h2>
        <p>
          <br />
          Icons made by{' '}
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </p>
      </div>
    </div>
  )
}

export default Credits
