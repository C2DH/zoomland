import LogoZoomland from './Svg/LogoZoomland'

const ZoomlandIntro = () => {
  return (
    <div
      className="background-pattern"
      style={{ zIndex: '7', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <div style={{ position: 'relative', zIndex: 10 }}>
        <LogoZoomland size={260} />
      </div>
    </div>
  )
}

export default ZoomlandIntro
