import { MatomoProvider, createInstance } from '@jonkoops/matomo-tracker-react'
import { usePersistentStore } from '../store'
import { useMemo } from 'react'

const MatomoUrlBase = import.meta.env.VITE_MATOMO_URLBASE
const MatomoSiteId = import.meta.env.VITE_MATOMO_SITEID



const AnalyticsProvider = ({ children }) => {
  const acceptAnalytics = usePersistentStore((state) => state.acceptAnalytics)
  const MatomoInstance = useMemo(() => {
    return createInstance({
      urlBase: MatomoUrlBase,
      siteId: MatomoSiteId,
      // userId: 'UIDC2DH', // optional, default value: `undefined`.
      // trackerUrl: 'https://LINK.TO.DOMAIN/tracking.php', // optional, default value: `${urlBase}matomo.php`
      // srcUrl: 'https://LINK.TO.DOMAIN/tracking.js', // optional, default value: `${urlBase}matomo.js`
      disabled: !acceptAnalytics, // optional, false by default. Makes all tracking calls no-ops if set to true.
      heartBeat: {
        // optional, enabled by default
        active: true, // optional, default value: true
        seconds: 10, // optional, default value: `15
      },
      // linkTracking: false, // optional, default value: true
      configurations: {
        // optional, default value: {}
        // any valid matomo configuration, all below are optional
        disableCookies: true,
        setSecureCookie: window.location.protocol === 'https:',
        setRequestMethod: 'POST',
      },
    })
  }, [acceptAnalytics])

  console.info(
    '%cAnalyticsProvider',
    'font-weight: bold',
    '\n - urlBase:',
    MatomoUrlBase,
    '\n - siteId:',
    MatomoSiteId,
    '\n - enabled:',
    acceptAnalytics,
  )
  if (!acceptAnalytics) {
    return null
  }
  return <MatomoProvider value={MatomoInstance}>{children}</MatomoProvider>
}

export default AnalyticsProvider