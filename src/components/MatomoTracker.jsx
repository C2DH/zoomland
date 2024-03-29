import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { usePlayerStore } from '../store'

const BaseUrl = String(import.meta.env.BASE_URL || '/').replace(/\/$/, '') // /'zoomland' or ''

const MatomoTracker = () => {
  const { trackPageView } = useMatomo()
  const { pathname, search } = useLocation()
  const scene = usePlayerStore((state) => state.scene)
  const currentCollectedChapter = usePlayerStore((state) => state.currentCollectedChapter)
  const latestCollectedQuest = usePlayerStore((state) => state.latestCollectedQuest)

  useEffect(() => {
    const url = [BaseUrl, pathname, search].join('')
    console.debug('[MatomoTracker] track pageview:', url)
    trackPageView({
      href: url,
    })
  }, [pathname, search])

  useEffect(() => {
    const href = `${BaseUrl}/scene/${scene}`
    // this is the page indeed.
    console.debug('[MatomoTracker] track scene:', href)
    trackPageView({
      href,
    })
  }, [scene])

  useEffect(() => {
    if (!currentCollectedChapter) {
      return
    }
    const href = `${BaseUrl}/chapter/${currentCollectedChapter.id}`
    console.debug('[MatomoTracker] track currentCollectedChapter:', href)
    trackPageView({
      href,
    })
  }, [currentCollectedChapter])

  useEffect(() => {
    if (!latestCollectedQuest) {
      return
    }
    const href = Array.isArray(latestCollectedQuest.meetings)
      ? `${BaseUrl}/quest/${latestCollectedQuest.id}/${latestCollectedQuest.meetings.length}`
      : `${BaseUrl}/quest/${latestCollectedQuest.id}`
    console.debug('[MatomoTracker] track latestCollectedQuest:', href)
    trackPageView({
      href,
    })
  }, [latestCollectedQuest])
  return null
}

export default MatomoTracker
