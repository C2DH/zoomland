import { Html } from '@react-three/drei'
import { useWindowStore } from '../store'
import { Col, Container, Row } from 'react-bootstrap'
import LogoZoomland from '../components/Svg/LogoZoomland'
import LogoUni from '../components/Svg/LogoUni'
import RoundButton from './RoundButton'
import LogoGruyter from './Svg/LogoGruyter'
import './Book.css'

const Book = ({ position, scale }) => {
  const [width, height] = useWindowStore((state) => [state.width, state.height])
  return (
    <group position={position} scale={scale} dispose={null}>
      <mesh>
        <Html center>
          <div
            id="Book_content_wrapper"
            style={{
              height: height * 1.2,
              width: width,
            }}
          >
            <main>
              <header>
                <LogoZoomland color="var(--pale-orange)" />
                <nav>
                  <span>HOME</span>
                  <span>ABOUT</span>
                  <span>CONTACT</span>
                </nav>
              </header>
              <div id="Book_content">
                <Container>
                  <Row>
                    <Col xs={12} md={6} lg={5} xl={5} xxl={5} className="mb-4">
                      <img src="/assets/img/Book.jpg" alt="Book cover" className="h-auto w-100" />
                    </Col>
                    <Col xs={12} md={6} lg={7} xl={7} xxl={7} className="mb-4">
                      <LogoZoomland />
                      <h3>Exploring scale in digital history and humanities</h3>
                      <p>Edited be Florentina Armaselu and Andreas Flickers</p>
                      <RoundButton text="Read Book" backgroundColor="var(--rose)" />
                    </Col>
                  </Row>
                </Container>
              </div>
              <footer>
                <div id="Book_footer_logos">
                  <LogoUni />
                  <LogoGruyter />
                </div>
                <span>Copyright © Université du Luxembourg 2023. All rights reserved</span>
              </footer>
              Hello
            </main>
          </div>
        </Html>
      </mesh>
    </group>
  )
}

export default Book
