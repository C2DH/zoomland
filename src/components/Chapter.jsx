import { usePlayerStore } from '../store'
import { animated, useSpring } from '@react-spring/web'
import RoundButton from './RoundButton'
import { isMobile } from 'react-device-detect'
import Chapters from '../data/chapters.json'
import { Link } from 'react-router-dom'

const Chapter = ({ chapter }) => {
  const [props] = useSpring(() => ({
    transform: isMobile ? `scale(2.5)` : `scale(4)`,
    from: { transform: `scale(0)` },
    config: {
      tension: 600, // How much tension is on the spring
      mass: 2, // The mass of the spring
      velocity: 0.01, // The initial speed of the movement
    },
  }))

  const [doneCollectingChapter] = usePlayerStore((state) => [state.doneCollectingChapter])
  const data = Chapters.find((d) => d.id === chapter.id)

  return (
    <>
      <animated.div
        style={{
          lineHeight: '1rem',
          marginBottom: '2.5rem',
          color: 'var(--rose)',
          ...props,
        }}
      >
        {isMobile ? (
          <p
            style={{
              textShadow: '0px 2px 4px rgba(0, 0, 0, 0.35)',
              color: 'var(--orange)',
            }}
          >
            You've got <br />
            one chapter!
          </p>
        ) : (
          <p
            style={{
              textShadow: '0px 2px 4px rgba(0, 0, 0, 0.35)',
              color: 'var(--orange)',
            }}
          >
            You've got <strong>one chapter!</strong>
          </p>
        )}
      </animated.div>
      <span style={{ color: 'var(--pale-yellow)' }}>Chapter {data?.n}</span>
      <h3 style={{ color: 'var(--pale-yellow)' }}>{data?.title}</h3>
      <p>{data?.abstract}</p>

      <div className="mb-2">
        <button
          onClick={doneCollectingChapter}
          className="btn btn-transparent btn-link text-light pointer-events-auto"
        >
          Nice! One less to go
        </button>
      </div>
      <div className="btn-group">
        <Link to={`/chapters?id=${chapter.id}`} className="text-light">
          <RoundButton
            // Icon={CloseIcon}
            backgroundColor="var(--rose)"
            color={'var(--pale-yellow)'}
            text={'Read the chapter!'}
          />
        </Link>
      </div>
    </>
  )
}

export default Chapter
