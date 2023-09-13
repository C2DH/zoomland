import { Html } from '@react-three/drei'
import { SceneFakeBook, Start, usePlayerStore, useWindowStore } from '../store'
import { Col, Container, Row } from 'react-bootstrap'
import LogoZoomland from '../components/Svg/LogoZoomland'
import LogoUni from '../components/Svg/LogoUni'
import RoundButton from './RoundButton'
import LogoGruyter from './Svg/LogoGruyter'
import './Book.css'
import { useRef } from 'react'
import { EffectComposer, Glitch } from '@react-three/postprocessing'

const Book = ({ enableGlitch = false, ...props }) => {
  const [width, height] = useWindowStore((state) => [state.width, state.height])
  const [scene, setScene] = usePlayerStore((state) => [state.scene, state.setScene])
  const bookRef = useRef()
  const frameHeight = height * 1.2
  const frameWidth = width * 1.2
  return (
    <>
      <group ref={bookRef} {...props} dispose={null}>
        <Html transform={scene !== SceneFakeBook} occlude={scene !== SceneFakeBook}>
          <div
            id="Book"
            style={{
              top: -frameHeight / 2,
              left: -frameWidth / 2,
              height: frameHeight,
              width: frameWidth,
            }}
          >
            <main className="d-flex flex-column align-items-stretch">
              <header>
                <LogoZoomland color="var(--pale-orange)" />
                <nav>
                  <span>{scene}</span>
                  <span>HOME</span>
                  <span>ABOUT</span>
                  <span>CONTACT</span>
                </nav>
              </header>
              <Container id="Book__content" className="flex-grow-1 d-flex align-items-center">
                <Row className="d-flex align-items-center">
                  <Col xs={12} md={6} lg={5} xl={5} xxl={5} className="mb-0">
                    <img src="/assets/img/Book.jpg" alt="Book cover" />
                  </Col>
                  <Col xs={12} md={6} lg={7} xl={7} xxl={7} className="mb-4">
                    <LogoZoomland />
                    <h3>Exploring scale in digital history and humanities</h3>
                    <p>Edited be Florentina Armaselu and Andreas Flickers</p>
                    <RoundButton
                      onClick={() => setScene(Start)}
                      text="Read Book"
                      backgroundColor="var(--rose)"
                    />
                  </Col>
                </Row>
              </Container>
              <footer>
                <div id="Book_footer_logos">
                  <LogoUni />
                  <LogoGruyter />
                </div>
                <span>Copyright © Université du Luxembourg 2023. All rights reserved</span>
              </footer>
            </main>
          </div>
        </Html>
      </group>
    </>
  )
}

export default Book
