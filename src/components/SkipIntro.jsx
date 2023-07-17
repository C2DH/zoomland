import { Button } from 'react-bootstrap'
import './SkipIntro.css'
import { Gameplay, OpenSea, usePlayerStore } from '../store'
import { useEffect } from 'react'
import { useSpring, a } from '@react-spring/web'
const SkipIntro = () => {
  const [scene, setScene] = usePlayerStore((state) => [state.scene, state.setScene])
  const [style, api] = useSpring(() => ({
    opacity: 1,
  }))

  useEffect(() => {
    if (scene !== OpenSea) {
      api.start({
        opacity: 0,
      })
    } else {
      api.start({
        opacity: 1,
      })
    }
  }, [scene])

  return (
    <a.div style={style} className="SkipIntro">
      <Button variant="primary" size="lg" block onClick={() => setScene(Gameplay)}>
        Skip intro{' '}
      </Button>
    </a.div>
  )
}

export default SkipIntro
