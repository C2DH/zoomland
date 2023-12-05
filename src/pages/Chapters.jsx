import { Col, Container, Row } from 'react-bootstrap'
import Page from './Page'
import ChapterCard from '../components/ChapterCard'
import { usePlayerStore } from '../store'
import data from '../data/chapters.json'
import { useLayoutEffect, useState } from 'react'
import Quest from '../components/Quest'
import './Chapters.css'
import { useSearchParams } from 'react-router-dom'

const wrapSentences = (sentences, url, title) => {
  return [`"${title}"`].concat(
    sentences.map((s, i, arr) => {
      return [
        `<span class='text-muted'>${i + 1} / ${arr.length}</span> ..."`,
        s,
        '"<br/><br/>',
        `<a href="${url || import.meta.env.VITE_BOOK_URL}" target="_blank">Read online</a>`,
      ].join('')
    }),
  )
}

const Chapters = () => {
  const [searchParams] = useSearchParams()
  const inititalChapterId = searchParams.get('id')
  const initialChapterIdx = data.findIndex((d) => d.id === inititalChapterId) || -1
  const [sentences, setSentences] = useState(
    initialChapterIdx !== -1
      ? wrapSentences(data[initialChapterIdx].sentences, null, data[initialChapterIdx].title)
      : ['Here I store the Chapters securely.'],
  )
  const [selectedChapterIdx, setSelectedChapterIdx] = useState(initialChapterIdx)
  const [collectedChapters] = usePlayerStore((state) => [state.collectedChapters])

  const onFlippedHandler = ({ flipped, notFound, idx }) => {
    console.debug('[Chapters] onFlipped', flipped)
    if (notFound || flipped) {
      setSelectedChapterIdx(idx)
      setSentences(wrapSentences(data[idx].sentences, data[idx].url, data[idx].title))
    } else {
      setSelectedChapterIdx(-1)
      setSentences([])
    }
  }

  useLayoutEffect(() => {
    if (initialChapterIdx !== -1) {
      document.getElementById(`anchor-${inititalChapterId}`).scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [initialChapterIdx, inititalChapterId])

  return (
    <Page fullscreen className="Chapters p-5" PageHeader={() => <h1> Chapters</h1>}>
      <Container>
        <Row>
          {data.map((chapter, i) => (
            <Col key={chapter.id} xs={12} md={6} lg={4} xl={3} xxl={3} className="mb-4">
              <a id={`anchor-${chapter.id}`} className="mb-2">
                {i + 1} of {data.length}
              </a>
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
        style={{ position: 'fixed', pointerEvents: 'none', zIndex: 120 }}
        className="pointer-events-none top-0 bottom-0 end-0 start-0"
      >
        {sentences.length ? (
          <Quest
            onlyYou
            defaultYouLabel={
              selectedChapterIdx > -1
                ? 'Chapter #' + String(selectedChapterIdx).padStart(2, '0')
                : 'You'
            }
            asHtml
            defaultAvatar={
              selectedChapterIdx > -1
                ? `/assets/cards/${data[selectedChapterIdx].id}-720w.jpg`
                : undefined
            }
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
