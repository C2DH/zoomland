import { Button } from 'react-bootstrap'
import './SkipIntro.css'
import { Gameplay, OpenSea, Start, usePlayerStore } from '../store'
import { useEffect } from 'react'
import { useSpring, a } from '@react-spring/web'
const SkipIntro = () => {
  const [scene, setScene] = usePlayerStore((state) => [state.scene, state.setScene])
  const [style, api] = useSpring(() => ({
    opacity: 1,
  }))

  useEffect(() => {
    if (scene !== OpenSea && scene !== Start) {
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
      <Button
        variant="primary"
        size="lg"
        block
        onClick={() => setScene(scene === Start ? OpenSea : Gameplay)}
      >
        {scene === Start && <span>Let's get to the harbour!</span>}
        {scene === OpenSea && <span>Let's get to the island!</span>}
        {scene}
      </Button>
    </a.div>
  )
}

export default SkipIntro
