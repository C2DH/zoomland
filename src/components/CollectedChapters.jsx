import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { usePlayerStore, NumberOfChapters } from '../store'
import './CollectedChapters.css'

const CollectedChapters = () => {
  const [progress, collectedChapters] = usePlayerStore((state) => [
    state.progress,
    state.collectedChapters,
  ])
  return (
    <div className="CollectedChapters">
      <Container fluid>
        <Row>
          <Col>{progress} %</Col>
          <Col>
            {collectedChapters} / {NumberOfChapters}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CollectedChapters
