import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { usePlayerStore, NumberOfChapters, useWorldStore } from '../store'
import './Header.css'
import Timer from './Timer'

const Header = ({ children }) => {
  const [progress, collectedChapters] = usePlayerStore((state) => [
    state.progress,
    state.collectedChapters,
  ])
  const saveInitialPropsToPlayerStore = useWorldStore(
    (state) => state.saveInitialPropsToPlayerStore,
  )

  const HumanreadableProgress = Math.round(progress * 100)
  return (
    <div className="Header m-5">
      <Container>
        <Row>
          <Col>
            <h1>Zoomland</h1>
            <button className="btn btn-primary" onClick={saveInitialPropsToPlayerStore}>
              save
            </button>
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
            <Timer />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Header
