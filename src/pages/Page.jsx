import { Link } from 'react-router-dom'
import { useWindowStore } from '../store'
import { X } from '@phosphor-icons/react'
import './Page.css'

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
        <button
          className="Page_close"
          onClick={() => {
            window.history.back()
          }}
        >
          <X weight="regular" size={50} />
        </button>
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
      </div>
    </div>
  )
}
export default Page
