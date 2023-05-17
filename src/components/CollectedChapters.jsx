import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { usePlayerStore, NumberOfChapters } from '../store'
import './CollectedChapters.css'

const CollectedChapters = ({ children }) => {
  const [progress, collectedChapters] = usePlayerStore((state) => [
    state.progress,
    state.collectedChapters,
  ])

  const HumanreadableProgress = Math.round(progress * 100)
  return (
    <div className="CollectedChapters m-5">
      <Container>
        <Row>
          <Col>
            <h1>Zoomland</h1>
            {children}
          </Col>
          <Col className="text-end">
            goal <br />
            {HumanreadableProgress} %
          </Col>
          <Col className="text-end">
            chapters <br />
            {collectedChapters.length} / {NumberOfChapters}
          </Col>
          <Col className="text-end">
            elapsed time:
            <br />
            00:00:00
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CollectedChapters