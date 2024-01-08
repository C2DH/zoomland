import { useRef, useLayoutEffect } from 'react'
import { SceneCredits, usePlayerStore, useWindowStore } from '../store'
import './Credits.css'
import IntroLogoZoomland from './IntroLogoZoomland'
import LogoUni from './Svg/LogoUni'
import LogoGruyter from './Svg/LogoGruyter'
import { useSpring, a } from '@react-spring/web'

const Credits = ({ duration = 20000 }) => {
  const contentRef = useRef()

  const [width, height] = useWindowStore((state) => [state.width, state.height])

  const scene = usePlayerStore((state) => state.scene)
  const [{ y }, api] = useSpring(() => ({
    y: 0,
    config: {
      duration: 1500,
    },
    onRest: () => {
      // restart
      runCredits()
    },
  }))

  const runCredits = () => {
    api.set({
      y: height,
      // modify duration based on ratio between screen and content height
    })
    api.start({
      y: -contentRef.current.scrollHeight,
      config: {
        duration: duration * (contentRef.current.scrollHeight / height),
      },
    })
  }

  useLayoutEffect(() => {
    if (scene === SceneCredits) {
      // start moving from the bottom
      runCredits()
    }
  }, [width, height, scene])

  return (
    <div className={`Credits ${scene === SceneCredits ? 'visible' : ''}`}>
      <a.div style={{ y, textAlign: 'center' }} ref={contentRef}>
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
        {/* HISTORY */}
        <div className="Credits_block">
          <p>Alex Butterworth</p>
          <span>
            Adventures in Zoomland: Transitions in Scale and the Visual Exploration of Historical
            Knowledge Graphs as Sequential Storytelling
          </span>
        </div>
        <div className="Credits_block">
          <p>Christian Wachter</p>
          <span>
            Capturing Discourse through the Digital Lens: Towards a Framework for the Analysis of
            Pro-democratic Discourse in the Weimar Republic
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
        {/* MEDIA */}
        <div className="Credits_block">
          <p>
            Fred Pailler
            <br />
            Valérie Schafer
          </p>
          <span>
            Keep Calm and Stay Focused: Historicising and Intertwining Scales and Temporalities of
            Online Virality
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
            Adapting the Optics: Zoom-in, Zoom-out, and Zoom-zero Modes to Understand Religious
            Sculptures
          </span>
        </div>
        <div className="Credits_block">
          <p>Johan Malmstedt</p>
          <span>
            Scale Exercises: Listening to the Sonic Diversity in 5000 hours of Swedish Radio with
            Computers and Ears
          </span>
        </div>
        {/* HERMENEUTICS */}
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
            The Scales of (Computational) Literary Studies: Martin Mueller’s Concept of Scalable
            Reading in Theory and Practice
          </span>
        </div>
        <div className="Credits_block">
          <p>Florentina Armaselu</p>
          <span>Text, Fractal Dust and Informational Granularity: A Study of Scale</span>
        </div>
        <div className="Credits_block">
          <p>Stephen Robertson</p>
          <span>
            Scale and Narrative: Conceiving a Long-form Digital Argument for Data-driven
            Microhistory
          </span>
        </div>
        {/* DIGITAL LANDSCAPES */}
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
            Zooming is (not just) Scaling: Considerations of Scale in Old Maps from Cartographic
            Perspectives on Generalisation
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
          src={`${import.meta.env.BASE_URL || '/'}assets/img/Zoomland_sketch.jpg`}
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
        <div className="Credits_block">
          <p>Sarah Cooper </p>
          <span>Linguistic Alchemist</span>
        </div>
        <div className="Credits_block mb-5">
          <p>Wojciech Dobry</p>
          <span>ThreeJs Guru</span>
        </div>
        <img
          className="mb-5"
          src={`${import.meta.env.BASE_URL || '/'}assets/img/three_graces.jpg`}
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
      </a.div>
    </div>
  )
}

export default Credits
