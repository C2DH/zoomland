import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { usePlayerStore } from '../store'
import { animated, useSpring } from '@react-spring/web'
import { useEffect } from 'react'
import RoundButton from './RoundButton'
import { isMobile } from 'react-device-detect'

const Chapter = ({ chapter }) => {
  const [props, api] = useSpring(() => ({
    fontSize: isMobile ? `12vw` : `5vw`,
    from: { fontSize: `0vw` },
    color: 'var(--pale-orange)',
    config: {
      tension: 600, // How much tension is on the spring
      mass: 0.5, // The mass of the spring
      velocity: 1, // The initial speed of the movement
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
        fontSize: `3.2vw`,
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
      <animated.div style={props}>YOU FOUND IT!!!!</animated.div>
      {data.n > 0}
      {isCollected ? '✅' : 'NEW!!!'}
      Chapter {data.n}
      <h3>{data?.title}</h3>
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
