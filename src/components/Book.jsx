import { Col, Container, Row } from 'react-bootstrap'
import LogoZoomland from '../components/Svg/LogoZoomland'
import LogoUni from '../components/Svg/LogoUni'
import RoundButton from './RoundButton'
import LogoGruyter from './Svg/LogoGruyter'
import './Book.css'
import MenuIcon from './Svg/MenuIcon'
import { isMobile } from 'react-device-detect'

const Book = ({ className = '', disabled = false, onClick }) => {
  return (
    <div
      // style={{ opacity: scene === SceneFakeBook ? '1' : '0' }}
      className={`Book ${className}`}
    >
      <main className="d-flex flex-column align-items-stretch" onClick={isMobile ? onClick : null}>
        <header>
          <LogoZoomland color="var(--pale-orange)" />
          <nav>
            {/* <span>{scene}</span> */}
            <span>HOME</span>
            <span>ABOUT</span>
            <span>CONTACT</span>
          </nav>
          <RoundButton
            disabled={disabled}
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
                <img
                  src={`${import.meta.env.BASE_URL || '/'}assets/img/Book.jpg`}
                  alt="Book cover"
                />
              </div>
            </Col>
            <Col className="Book_content_right" xs={12} md={6} lg={7} xl={7} xxl={7}>
              <div className="mb-3">{isMobile ? null : <LogoZoomland size="120" />}</div>
              <h3>Exploring scale in digital history and humanities</h3>
              <p className="mb-4">Edited by Florentina Armaselu and Andreas Flickers</p>
              <RoundButton text="Read the book" backgroundColor="var(--rose)" onClick={onClick} />
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
