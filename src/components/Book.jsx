import { Html } from '@react-three/drei'
import {
  Gameplay,
  SceneFakeBook,
  Start,
  usePlayerStore,
  useWindowStore,
  useGlitchStore,
} from '../store'
import { Col, Container, Row } from 'react-bootstrap'
import LogoZoomland from '../components/Svg/LogoZoomland'
import LogoUni from '../components/Svg/LogoUni'
import RoundButton from './RoundButton'
import LogoGruyter from './Svg/LogoGruyter'
import './Book.css'
import { useRef, useState } from 'react'
import MenuIcon from './Svg/MenuIcon'
// import { EffectComposer, Glitch } from '@react-three/postprocessing'

const Book = ({ enableGlitch = false, enabled = false, className = '', ...props }) => {
  // const [width, height] = useWindowStore((state) => [state.width, state.height])
  const { globalGlitchClass, setGlobalGlitchClass } = useGlitchStore()
  const [scene, setScene] = usePlayerStore((state) => [state.scene, state.setScene])

  const handleButtonClick = () => {
    setGlobalGlitchClass('Glitch') // Replace 'new-class' with the class you want to add
    setTimeout(() => {
      setScene(Gameplay)
      setGlobalGlitchClass('remove')
    }, 3000)
  }

  console.info('[Book] scene', scene, 'enabled', enabled, 'enabledGlitch', enableGlitch)
  return (
    <div
      // style={{ opacity: scene === SceneFakeBook ? '1' : '0' }}
      className={`Book ${globalGlitchClass}${className}`}
    >
      <main className="d-flex flex-column align-items-stretch">
        <header>
          <LogoZoomland color="var(--pale-orange)" />
          <nav>
            {/* <span>{scene}</span> */}
            <span>HOME</span>
            <span>ABOUT</span>
            <span>CONTACT</span>
          </nav>

          <RoundButton
            className="Fake_menu"
            Icon={MenuIcon}
            color={'var(--pale-yellow)'}
            backgroundColor={'var(--transparent)'}
          />
        </header>
        <Container id="Book_content" className="flex-grow-1 d-flex align-items-center">
          <Row className="d-flex align-items-center">
            <Col xs={12} md={6} lg={5} xl={5} xxl={5} className="mb-0">
              <div className="img-wrapper">
                <img src="/assets/img/Book.jpg" alt="Book cover" />
              </div>
            </Col>
            <Col className="Book_content_right" xs={12} md={6} lg={7} xl={7} xxl={7}>
              <div className="mb-3">
                <LogoZoomland size="120" />
              </div>
              <h3>Exploring scale in digital history and humanities</h3>
              <p className="mb-4">Edited be Florentina Armaselu and Andreas Flickers</p>
              <RoundButton
                // onClick={() => setScene(Start)}
                onClick={handleButtonClick}
                text="Read Book"
                backgroundColor="var(--rose)"
              />
            </Col>
          </Row>
        </Container>
        <footer>
          <div id="Book_footer_logos">
            <div className="me-3">
              <LogoUni />
            </div>
            <LogoGruyter />
          </div>
          <span className="my-3">
            Copyright © Université du Luxembourg 2023. All rights reserved
          </span>
        </footer>
      </main>
    </div>
  )
}

export default Book
