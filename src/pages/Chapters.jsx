import { Col, Container, Row } from 'react-bootstrap'
import Page from './Page'
import ChapterCard from '../components/ChapterCard'
import { usePlayerStore } from '../store'
import data from '../data/chapters.json'
import { useState } from 'react'
import Quest from '../components/Quest'
import './Chapters.css'

const Chapters = () => {
  const [sentences, setSentences] = useState(['Here I store the Chapters securely.'])
  const [collectedChapters] = usePlayerStore((state) => [state.collectedChapters])

  const onFlippedHandler = ({ flipped, idx }) => {
    console.debug('[Chapters] onFlipped', flipped)
    setSentences(
      data[idx].sentences.map((s, i, arr) =>
        [
          `${i + 1} / ${arr.length}  &mdash; "`,
          s,
          '<br/><br/>',
          `<a href="${import.meta.env.VITE_BOOK_URL}" target="_blank">Read online</a>`,
        ].join(''),
      ),
    )
  }

  return (
    <Page fullscreen className="Chapters p-5" PageHeader={() => <h1> Chapters</h1>}>
      <Container>
        <Row>
          {data.map((chapter, i) => (
            <Col key={chapter.id} xs={12} md={6} lg={4} xl={3} xxl={3} className="mb-4">
              <ChapterCard
                chapter={chapter}
                idx={i}
                onFlipped={onFlippedHandler}
                notFound={!collectedChapters.some((d) => d.id === chapter.id)}
              />
              {/* <ChapterListItem chapter={chapter} /> */}
            </Col>
          ))}
        </Row>
      </Container>
      <div
        style={{ position: 'fixed', pointerEvents: 'none' }}
        className="pointer-events-none top-0 bottom-0 end-0 start-0"
      >
        {sentences.length ? (
          <Quest
            onlyYou
            asHtml
            enablePrevious
            enableSpaceKey={false}
            enableClose
            initialDelay={100}
            quest={{ sentences }}
            onComplete={() => setSentences([])}
            onCompleteLabel="(end of the excerpt)"
          />
        ) : null}
      </div>
    </Page>
  )
}

export default Chapters
