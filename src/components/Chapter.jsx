import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { usePlayerStore } from '../store'
import { animated, useSpring } from '@react-spring/web'
import { useEffect } from 'react'

const Chapter = ({ chapter }) => {
  const [props, api] = useSpring(() => ({
    transform: `scale(0)`,
    from: { transform: `scale(0)` },
    config: {
      tension: 400, // How much tension is on the spring
      mass: 2, // The mass of the spring
      velocity: 5, // The initial speed of the movement
    },
  }))

  const [collectedChapters] = usePlayerStore((state) => [state.collectedChapters])

  const isCollected = collectedChapters.some(
    (d) => d.id === chapter.id && Array.isArray(d.readings) && d.readings.length,
  )

  useEffect(() => {
    if (!isCollected) {
      api.start({
        transform: `scale(5)`,
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
      <animated.div className="position-absolute" style={props}>
        YOU FOUND IT!!!!
      </animated.div>
      {data.n > 0}
      {isCollected ? '✅' : '❌'}
      Chapter {data.n}
      <h3>{data?.title}</h3>
      <p>{data?.abstract}</p>
    </>
  )
}

export default Chapter
