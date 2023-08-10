import { useSprings, a, config } from '@react-spring/web'
import { useEffect } from 'react'

const zoomlandLetters = [
  {
    id: 'z',
    d: 'm38.2,49.2H14.5L44.4,8.9H0l7.3,9h18.1L0,52.1v6.1h45.3l-7.1-9Z',
  },
  {
    id: 'oo',
    d: 'm118.5,5.9c12.5,1.5,22.6,11.5,24.2,24,2.3,18.2-13.3,34.6-31.2,31.2-10.4-2-15.7-9.1-19.6-17.1,0,0-12.1-28.9-23.2-28.9-11.4,0-20.5,10.3-18.3,22.1,1.3,7.4,7.3,13.4,14.7,14.8,4.4.8,13.9.7,19.8-9.2l4.6,9.1c-8.2,9.4-18.3,10.1-24.2,9.4-12.5-1.5-22.6-11.5-24.2-24-2.3-18.2,13.2-34.7,31.2-31.2,10.4,2,15.7,9.1,19.6,17.1,0,0,12,28.9,23.2,28.9s20.5-10.3,18.3-22.1c-1.3-7.4-7.3-13.4-14.7-14.8-4.4-.8-13.9-.7-19.8,9.2l-4.6-9.1c8.2-9.4,18.3-10.1,24.2-9.4Z',
  },
  {
    id: 'm',
    d: 'm198.2,9h5.9l12.4,49.3h-9.9l-7.6-30-19.5,39.1-19.6-39.1-7.6,30h-9.8l12.4-49.3h5.9l18.7,39,18.7-39Z',
  },
  {
    id: 'l',
    d: 'm249,58.3h-30.1V9h9.8v40.2h24.6l-4.3,9.1Z',
  },
  {
    id: 'a',
    d: 'm309.2,58.2L281.4,0l-28,58.4h55.8v-.2Zm-41.3-8.6l13.5-28.7,13.5,28.7h-27Z',
  },
  {
    id: 'n',
    d: 'm309.2,58.4h9.9v-31l26.7,31h7.7V9h-10v31.9l-27-31.9h-7.3v49.4Z',
  },
  {
    id: 'd',
    d: 'm377.9,9h-18.9v49.3h18.9c15.1,0,26.4-10.7,26.4-24.9s-11.3-24.4-26.4-24.4Zm0,40.2h-9.1v-31.1h9.1c9.1,0,16.4,6.8,16.4,15.3s-7.3,15.8-16.4,15.8Z',
  },
]

const LogoZoomland = ({ color = 'var(--pale-yellow)', size = 160 }) => {
  const [props, api] = useSprings(zoomlandLetters.length, (i) => ({
    from: { scale: 0.5 },
    to: { scale: 1 },
    // loop: true,
    // config: { ...config.stiff },

    delay: i * 500,
    config: { duration: 700 },
  }))

  const ratio = 406 / 69
  return (
    <svg
      className="LogoZoomland"
      width={size}
      height={size / ratio}
      viewBox="0 0 404.3 67.4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {props.map((style, i) => (
        <a.path
          style={style}
          fill={color}
          id={zoomlandLetters[i].id}
          d={zoomlandLetters[i].d}
          key={i}
        />
      ))}
    </svg>
  )
}

export default LogoZoomland
