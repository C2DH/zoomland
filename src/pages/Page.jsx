import { Link } from 'react-router-dom'
import { useWindowStore } from '../store'
import './Page.css'

const Page = ({ status = 'idle', className = '', PageHeader = null, children }) => {
  const [width, height] = useWindowStore((state) => [state.width, state.height])
  return (
    <div className={`${className} Page page d-flex flex-column`} style={{ width, height }}>
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
