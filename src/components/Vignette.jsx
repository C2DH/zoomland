import { useEffect } from 'react'
import { usePlayerStore } from '../store'
import Chapters from '../data/chapters'
import Quests from '../data/quests'
import './Vignette.css' // Import CSS styles
import { animated, useSpring } from '@react-spring/web'
import Quest from './Quest'

const interpolator = (v) => {
  return `radial-gradient(ellipse at center, rgba(0, 0, 0, 0) ${v}%, rgba(0, 0, 0, 0) ${v}%, rgba(0, 0, 0, 1) 95%, rgba(0, 0, 0, 1) 100%)`
}

const Vignette = ({ children, visible = true }) => {
  const [isCollectingChapter, collectedChapters] = usePlayerStore((state) => [
    state.isCollectingChapter,
    state.collectedChapters,
  ])
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

  const lastCollectedChapter = collectedChapters.length
    ? collectedChapters[collectedChapters.length - 1]
    : null

  const lastCollectedQuest = collectedQuests.length
    ? collectedQuests[collectedQuests.length - 1]
    : null
  // if vignette should be visible
  const [props, api] = useSpring(() => ({
    qty: 100,
  }))

  useEffect(() => {
    if (isCollectingChapter || isCollectingQuest) {
      api.start({
        qty: 50,
      })
    } else {
      api.start({
        qty: 100,
      })
    }
  }, [isCollectingChapter, isCollectingQuest])

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
  return (
    <>
      <animated.div className="Vignette" style={{ background: props.qty.to(interpolator) }}>
        <div class="btn-group" role="group">
          <button onClick={handleToggle} type="button" class="btn btn-primary">
            random chapter
          </button>
          <button onClick={handleReset} type="button" class="btn btn-primary">
            reset chapters
          </button>
          <button onClick={handleTestQuests} type="button" class="btn btn-primary">
            pick random quests
          </button>
          <button onClick={handleResetQuests} type="button" class="btn btn-primary">
            reset quests
          </button>
        </div>

        {isCollectingChapter && (
          <div className="Vignette_subs">
            <h3>
              {isCollectingChapter} {lastCollectedChapter.title}
            </h3>
            <p>{lastCollectedChapter.abstract}</p>
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
