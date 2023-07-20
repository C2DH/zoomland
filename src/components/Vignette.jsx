import { useEffect } from 'react'
import { OpenSea, usePlayerStore } from '../store'
import Chapters from '../data/chapters'
import Quests from '../data/quests'
import './Vignette.css' // Import CSS styles
import { animated, useSpring } from '@react-spring/web'
import Quest from './Quest'
import Chapter from './Chapter'

const interpolator = (v) => {
  return `radial-gradient(ellipse at center, rgba(0, 0, 0, 0) ${v}%, rgba(0, 0, 0, 0) ${v}%, rgba(0, 0, 0, 1) 95%, rgba(0, 0, 0, 1) 100%)`
}

const Vignette = ({ children, visible = true, debug = false }) => {
  const [scene] = usePlayerStore((state) => [state.scene])
  const [currentCollectedChapter, isCollectingChapter, collectedChapters] = usePlayerStore(
    (state) => [state.currentCollectedChapter, state.isCollectingChapter, state.collectedChapters],
  )
  const [isCollectingQuest, collectedQuests] = usePlayerStore((state) => [
    state.isCollectingQuest,
    state.collectedQuests,
  ])

  const [collectChapter, doneCollectingChapter, resetCollectedChapters] = usePlayerStore(
    (state) => [state.collectChapter, state.doneCollectingChapter, state.resetCollectedChapters],
  )

  const [collectQuest, doneCollectingQuest, resetCollectedQuests] = usePlayerStore((state) => [
    state.collectQuest,
    state.doneCollectingQuest,
    state.resetCollectedQuests,
  ])

  const lastCollectedQuest = collectedQuests.length
    ? collectedQuests[collectedQuests.length - 1]
    : null
  // if vignette should be visible
  const [props, api] = useSpring(() => ({
    qty: 100,
  }))

  const handleToggle = () => {
    console.debug('toggle vignette')
    if (isCollectingChapter) {
      doneCollectingChapter()
    } else {
      const randomChapterIndex = Math.floor(Math.random() * Chapters.length)
      console.info('randomChapterIndex', randomChapterIndex, Chapters)
      collectChapter(Chapters[randomChapterIndex])
    }
  }
  const handleTestQuests = () => {
    if (isCollectingQuest) {
      doneCollectingQuest()
    } else {
      const randomQuestIndex = Math.floor(Math.random() * Quests.length)
      console.info('randomQuestIndex', randomQuestIndex, Quests)
      collectQuest(Quests[randomQuestIndex])
    }
  }
  const handleReset = () => {
    console.debug('[Vignette] reset!')
    resetCollectedChapters()
  }
  const handleResetQuests = () => {
    console.debug('[Vignette] reset quests!')
    resetCollectedQuests()
  }

  useEffect(() => {
    if (isCollectingChapter || isCollectingQuest || scene === OpenSea) {
      api.start({
        qty: 50,
      })
    } else {
      api.start({
        qty: 100,
      })
    }
  }, [isCollectingChapter, isCollectingQuest])

  // add keys to the collected chapters
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'Escape') {
        if (isCollectingChapter) {
          doneCollectingChapter()
        } else if (isCollectingQuest) {
          doneCollectingQuest()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isCollectingChapter, isCollectingQuest])

  return (
    <>
      <animated.div className="Vignette" style={{ background: props.qty.to(interpolator) }}>
        {debug && (
          <div className="btn-group" role="group">
            <button onClick={handleToggle} type="button" className="btn btn-primary">
              random chapter
            </button>
            <button onClick={handleReset} type="button" className="btn btn-primary">
              reset chapters
            </button>
            <button onClick={handleTestQuests} type="button" className="btn btn-primary">
              pick random quests
            </button>
            <button onClick={handleResetQuests} type="button" className="btn btn-primary">
              reset quests
            </button>
          </div>
        )}

        {isCollectingChapter && (
          <div className="Vignette_subs">
            <Chapter chapter={currentCollectedChapter}> </Chapter>
          </div>
        )}
        {isCollectingQuest && (
          <Quest
            quest={lastCollectedQuest}
            onComplete={doneCollectingQuest}
            withChapter={collectedChapters.some((d) => lastCollectedQuest.chapter === d.id)}
          />
        )}
      </animated.div>

      {children}
    </>
  )
}

export default Vignette
