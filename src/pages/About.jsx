import { Col, Container, Row } from 'react-bootstrap'
import Page from './Page'

const About = () => {
  return (
    <Page fullscreen className="p-5" PageHeader={() => <h1>About</h1>}>
      <Container>
        <Row>
          <Col>
            <h2>"Zoomland. Exploring Scale in Digital History and Humanities"</h2>
            <p>
              "Players explore the different areas of the island, each of which is associated with a
              chapter in the book. The goal is to gather the scattered chapters and to draw a map of
              Zoomland that identifies the four regions (History, Media, Hermeneutics and Digital
              Landscapes) and assigns a perspective symbol to each chapter (bird’s eye, overhead or
              ground level)."
            </p>
          </Col>
        </Row>
      </Container>
    </Page>
  )

  // <div className="page">
  //   <div style={{ marginRight: '0.7rem', position: 'absolute', right: 0, top: '1rem' }}>
  //     <RoundButton
  //       Icon={CloseIcon}
  //       Color={'var(--dark-blue)'}
  //       onClick={() => {
  //         window.history.back()
  //       }}
  //     />
  //   </div>
  //   <h1>About</h1>
  //   <p>"Zoomland. Exploring Scale in Digital History and Humanities"</p>
  //   <p>
  //     "The Player will explore the different areas of the island, which are associated to a
  //     chapter in the book. The player goal is to gather the scattered chapters and to draw a map
  //     of Zoomland that identifies the 4 regions (History, Media, Hermeneutics and Digital
  //     landscapes) and assign a symbol to each chapter according to the 3 perspectives (bird's eye,
  //     overhead and ground view)."
  //   </p>
  //   <div
  //     className="background-pattern-reverce"
  //     style={{ width: '100vw', zIndex: '-1', top: '0' }}
  //   ></div>
  // </div>
}

export default About
