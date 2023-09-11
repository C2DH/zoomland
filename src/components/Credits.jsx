import { useRef, useLayoutEffect } from 'react'
import { SceneCredits, usePlayerStore, useMenuStore } from '../store'
import './Credits.css'
import IntroLogoZoomland from './IntroLogoZoomland'
import LogoUni from './Svg/LogoUni'
import LogoGruyter from './Svg/LogoGruyter'

const Credits = () => {
  const contentRef = useRef()
  const scene = usePlayerStore((state) => state.scene)

  if (scene !== SceneCredits) {
    return null
  }

  return (
    <div className="Credits">
      <div
        className={`Credits__content position-relative ${scene === SceneCredits ? 'visible' : ''}`}
      >
        <div ref={contentRef}>
          {/* this is scrolling automatically */}
          <IntroLogoZoomland delay={5000} height={'auto'} />
          <h2 className="text-center mb-5">Thank you for your love and support! </h2>
          <h3 className="text-center">WRITERS</h3>
          <div className="Credits_block">
            <p>
              Andreas Fickers
              <br />
              Florentina Armaselu
            </p>
            <span>Introduction</span>
          </div>
          <div className="Credits_block">
            <p>Alex Butterworth</p>
            <span>Adventure in Zoomland</span>
          </div>
          <div className="Credits_block">
            <p>Christian Wachter</p>
            <span>
              Capturing Discourse through the Digital Lens: Towards a framework for the analysis of
              pro-democratic discourse in the Weimar Republic
            </span>
          </div>
          <div className="Credits_block">
            <p>Amanda Madden</p>
            <span>Menocchio Mapped: Italian Microhistory and the Digital Spatial Turn</span>
          </div>
          <div className="Credits_block">
            <p>
              Mariaelena DiBenigno
              <br />
              Khanh Vo
            </p>
            <span>Scaling Digital History and Documenting the Self-Emancipated</span>
          </div>
          <div className="Credits_block">
            <p>
              Fred Pailler
              <br />
              Valérie Schafer
            </p>
            <span>
              Keep calm and stay focused: Historicising and intertwining scales and temporalities of
              online virality
            </span>
          </div>
          <div className="Credits_block">
            <p>
              Landry Digeon
              <br />
              Anjal Amin
            </p>
            <span>
              Zooming in on Shot Scales: A Digital Approach to Reframing Transnational TV series
              Adaptations
            </span>
          </div>
          <div className="Credits_block">
            <p>
              Nadezhda Povroznik
              <br />
              Daniil Renev
              <br />
              Vladimir Beresnev
            </p>
            <span>
              Adapting the optics: Zoom-in, Zoom-out, and Zoom-zero modes to understand the
              religious sculpture
            </span>
          </div>
          <div className="Credits_block">
            <p>
              Chris Tanasescu
              <br />
              Raluca Tanasescu
            </p>
            <span>
              Complexity and Analytical-creative Approaches at Scale: Iconicity, Monstrosity, and
              #GraphPoem
            </span>
          </div>
          <div className="Credits_block">
            <p>Benjamin Krautter</p>
            <span>
              The scales of (computational) literary studies: Martin Mueller’s concept of scalable
              reading in theory and practice
            </span>
          </div>
          <div className="Credits_block">
            <p>Florentina Armaselu</p>
            <span>A Study of Scale</span>
          </div>
          <div className="Credits_block">
            <p>Stephen Robertson</p>
            <span>
              Scale and Narrative: Conceiving a long-form digital argument for data-driven
              microhistory
            </span>
          </div>
          <div className="Credits_block">
            <p>Natalie M. Houston</p>
            <span>Meaningful Aesthetics: A Comparison of Open Source Network Analysis Tools</span>
          </div>
          <div className="Credits_block">
            <p>
              Quentin Lobbé
              <br />
              David Chavalarias
              <br />
              Alexandre Delanoë
            </p>
            <span>
              Defining Level and Scale as Socio-technical Operators for Mining Digital Traces
            </span>
          </div>
          <div className="Credits_block">
            <p>
              Francis Harvey
              <br />
              Marta Kuźma
            </p>
            <span>
              Zooming is (not just) scaling: Considerations of scale in old maps from cartographic
              perspectives on generalisation
            </span>
          </div>
          <div className="Credits_block mb-5">
            <p>
              Dario Rodighiero
              <br />
              Jean Daniélou
            </p>
            <span>Weather Map: A Diachronic Visual Model for Controversy Mapping</span>
          </div>
          <img
            className="mb-5"
            src="./assets/img/Zoomland_sketch.jpg"
            alt="Zoomland - island drawing"
            width="100%"
          />
          <h3 className="text-center">GAME DESIGN</h3>
          <div className="Credits_block">
            <p>Daniele Guido</p>
            <span>Code Whisperer / AI Puppeteer</span>
          </div>
          <div className="Credits_block">
            <p>Kirill Mitsurov</p>
            <span>Level Design Wizard</span>
          </div>
          <div className="Credits_block">
            <p>
              Micaelsampaio
              <br />
              Kirill Mitsurov
              <br />
              Mariia Drozdova
              <br />
              Jonh Gillessen
            </p>
            <span>Polygon Picasso / 3D Modeling</span>
          </div>
          <h3 className="text-center mt-5">SPECIAL THANKS</h3>
          <div className="Credits_block mb-5">
            <p>Wojciech Dobry</p>
            <span>ThreeJs Guru</span>
          </div>
          <img
            className="mb-5"
            src="./assets/img/three_graces.jpg"
            alt="three Graces"
            width="100%"
          />
          <p className="text-center mb-5 mt-5">
            <br />
            Icons made by{' '}
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik{' '}
            </a>
            from{' '}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </p>
          <div className="Credits_logos mt-5">
            <LogoUni />
            <LogoGruyter />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Credits
