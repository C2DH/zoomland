import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { usePlayerStore } from '../store'
import { animated, useSpring } from '@react-spring/web'
import { useEffect } from 'react'
import RoundButton from './RoundButton'
import { isMobile } from 'react-device-detect'
import ChapterCard from './ChapterCard'

const Chapter = ({ chapter }) => {
  const [props, api] = useSpring(() => ({
    transform: isMobile ? `scale(3)` : `scale(4)`,
    from: { transform: `scale(0)` },
    config: {
      tension: 600, // How much tension is on the spring
      mass: 2, // The mass of the spring
      velocity: 0.01, // The initial speed of the movement
    },
  }))

  const [collectedChapters, doneCollectingChapter] = usePlayerStore((state) => [
    state.collectedChapters,
    state.doneCollectingChapter,
  ])

  const isCollected = collectedChapters.some(
    (d) => d.id === chapter.id && Array.isArray(d.readings) && d.readings.length,
  )

  useEffect(() => {
    if (!isCollected) {
      api.start({
        transform: `scale(0)`,
      })
    }
  }, [isCollected])

  const { status, error, data } = useQuery({
    queryKey: ['chapter', chapter.id],
    queryFn: ({ signal }) => {
      return axios
        .get(`/data/chapters/${chapter.id}.json`, {
          signal,
        })
        .then(({ data }) => data)
    },
    enabled: typeof chapter.title === 'undefined',
  })
  if (!data) return 'loading...'
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
          <p>
            You've got <br />
            one chapter!
          </p>
        ) : (
          <p>
            You've got <strong>one chapter!</strong>
          </p>
        )}
      </animated.div>
      <span style={{ color: 'var(--pale-yellow)' }}>
        {data.n > 0}
        {isCollected ? '' : 'NEW!!!'}
        Chapter {data.n}
      </span>
      <h3 style={{ color: 'var(--pale-yellow)' }}>{data?.title}</h3>
      <p>{data?.abstract}</p>
      <div className="btn-group">
        <RoundButton
          // Icon={CloseIcon}
          color={'var(--pale-yellow)'}
          onClick={doneCollectingChapter}
          text={' OOOOKKK!'}
        />
      </div>
    </>
  )
}

export default Chapter
