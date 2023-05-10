import { Perf } from 'r3f-perf'

const WorldDashboard = ({ perf = true }) => {
  return <>{perf && <Perf position="top-left" />}</>
}

export default WorldDashboard
