import { Col, Container, Row } from 'react-bootstrap'
import Page from './Page'
import ChapterCard from '../components/ChapterCard'
import { usePlayerStore } from '../store'
import data from '../data/chapters.json'

const Chapters = () => {
  const [collectedChapters] = usePlayerStore((state) => [state.collectedChapters])

  console.debug('[Chapters] collectedChapters', collectedChapters)
  // load chapter using useQuery
  // const { status, error, data } = useQuery({
  //   queryKey: ['chapters'],
  //   queryFn: ({ signal }) => {
  //     return axios
  //       .get('/data/chapters.json', {
  //         signal,
  //       })
  //       .then(({ data }) => data)
  //   },
  // })

  return (
    <Page fullscreen className="p-5" PageHeader={() => <h1> Chapters</h1>}>
      <Container>
        <Row>
          {data.map((chapter) => (
            <Col key={chapter.id} xs={12} md={6} lg={4} xl={3} xxl={3} className="mb-4">
              <ChapterCard
                chapter={chapter}
                notFound={!collectedChapters.some((d) => d.id === chapter.id)}
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
