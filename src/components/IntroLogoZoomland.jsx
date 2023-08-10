import LogoZoomland from './Svg/LogoZoomland'

const IntroLogoZoomland = () => {
  return (
    <div
      style={{
        zIndex: '7',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
      }}
    >
      <div style={{ position: 'relative', zIndex: 10 }}>
        <LogoZoomland size={360} />
      </div>
    </div>
  )
}
export default IntroLogoZoomland
