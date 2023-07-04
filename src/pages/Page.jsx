import { Link } from 'react-router-dom'
import { useWindowStore } from '../store'
import './Page.css'
import RoundButton from '../components/RoundButton'
import CloseIcon from '../components/Svg/CloseIcon'

const Page = ({
  status = 'idle',
  className = '',
  PageHeader = null,
  fullscreen = false,
  children,
}) => {
  const [width, height] = useWindowStore((state) => [state.width, state.height])
  if (fullscreen) {
    return (
      <div className={`${className} Page scrollable page`} style={{ width, height }}>
        {children}
        {/* <button
          className="Page_close"
          onClick={() => {
            window.history.back()
          }}
        >
          <X weight="regular" size={50} />
        </button> */}
        <div style={{ marginRight: '0.7rem', position: 'absolute', right: 0, top: '1rem' }}>
          <RoundButton
            Icon={CloseIcon}
            Color={'var(--dark-blue)'}
            onClick={() => {
              window.history.back()
            }}
          />
        </div>
        <div
          className="background-pattern-reverce"
          style={{ width: '100vw', zIndex: '-1', top: '0' }}
        ></div>
      </div>
    )
  }
  return (
    <div className={`${className} Page  page d-flex flex-column`} style={{ width, height }}>
      {fullscreen && <div className="fullscreen"></div>}
      <header>
        <h2>
          <Link to="/">back</Link>
        </h2>
        {PageHeader && <PageHeader />}
      </header>

      <div className="flex-grow-1 scrollable">
        {status}
        {children}
        <div
          className="background-pattern-reverce"
          style={{ width: '100vw', zIndex: '-1', top: '-17px' }}
        ></div>
      </div>
    </div>
  )
}
export default Page
