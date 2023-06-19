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
    <Page status={status} error={error} PageHeader={() => <h1> Chapters</h1>}>
      <Container>
        <Row>
          {data?.map((chapter) => (
            <Col key={chapter.id} xs={12} md={6} lg={6} xl={3} className="mb-4">
              <ChapterCard chapter={chapter} />
              {/* <ChapterListItem chapter={chapter} /> */}
            </Col>
          ))}
        </Row>
      </Container>
    </Page>
  )
}

export default Chapters
