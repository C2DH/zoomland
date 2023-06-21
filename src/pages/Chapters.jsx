import { useQuery } from '@tanstack/react-query'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Page from './Page'
import axios from 'axios'
import ChapterListItem from '../components/ChapterListItem'
import ChapterCard from '../components/ChapterCard'
import { usePlayerStore } from '../store'

const Chapters = () => {
  const [progress, collectedChapters] = usePlayerStore((state) => [
    state.progress,
    state.collectedChapters,
  ])

  console.debug('[Chapters] collectedChapters', collectedChapters)
  // load chapter using useQuery
  const { status, error, data } = useQuery({
    queryKey: ['chapters'],
    queryFn: ({ signal }) => {
      return axios
        .get('/data/chapters.json', {
          signal,
        })
        .then(({ data }) => data)
    },
  })

  return (
    <Page
      fullscreen
      className="p-5"
      status={status}
      error={error}
      PageHeader={() => <h1> Chapters</h1>}
    >
      <Container>
        <Row>
          {data?.map((chapter) => (
            <Col key={chapter.id} xs={12} md={6} lg={4} xl={3} xxl={3} className="mb-4">
              <ChapterCard
                chapter={chapter}
                legacynotFound={!collectedChapters.some((d) => d.id === chapter.id)}
              />
              {/* <ChapterListItem chapter={chapter} /> */}
            </Col>
          ))}
        </Row>
      </Container>
    </Page>
  )
}

export default Chapters
