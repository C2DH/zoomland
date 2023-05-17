import { useSpring } from '@react-spring/web'

const About = () => {
  // const {} useSpring()

  // useEffect(() => {
  //   // put opacity to 1

  // }, [])

  return (
    <div className="page">
      <h1>About</h1>
      <p>"Zoomland. Exploring Scale in Digital History and Humanities"</p>
      <p>
        "The Player will explore the different areas of the island, which are associated to a
        chapter in the book. The player goal is to gather the scattered chapters and to draw a map
        of Zoomland that identifies the 4 regions (History, Media, Hermeneutics and Digital
        landscapes) and assign a symbol to each chapter according to the 3 perspectives (bird's eye,
        overhead and ground view)."
      </p>
    </div>
  )
}

export default About
