import { useEffect, useState } from 'react'
import './Quest.css'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import DialogueCard from './DialogueCard'

const to = (i, delay = 0) => ({
  x: 0,
  y: i * 250,
  opacity: 0,
  delay: delay,
})
const from = (i) => ({ x: 0, y: i * -250, opacity: 0 })

const Quest = ({
  quest,
  defaultAvatar = '/assets/avatars/Hero.jpg',
  defaultYouLabel = 'You',
  onlyYou = false,
  asHtml = false,
  initialDelay = 100,
  withChapter = false,
  onComplete,
  onCompleteLabel = 'Done',
  enableSpaceKey = true,
  enableClose = false,
  enablePrevious = false,
}) => {
  const [sentenceIndex, setSentenceIndex] = useState(-1)
  const [sentences, setSentences] = useState([])
  const [actuallyEnableClose, setActuallyEnableClose] = useState(enableClose)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (enableSpaceKey && (event.key === 'Enter' || event.key === ' ')) {
        if (sentenceIndex < sentences.length - 1) {
          setSentenceIndex(sentenceIndex + 1)
        } else {
          onComplete()
        }
      }
      if (enableClose && event.key === 'Escape') {
        onComplete()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [sentences, sentenceIndex])

  useEffect(() => {
    let s = []

    if (Array.isArray(quest.sentences)) {
      s = quest.sentences
    } else if (!Array.isArray(quest.meetings)) {
      // first time. use only initial sentences
      s = withChapter
        ? quest.dialogues.firstMeetingWithChapter
        : quest.dialogues.firstMeetingWithoutChapter
      // prevent closing the quest too fast
      setActuallyEnableClose(false)
      // reduce the possibility, but increases our chance to get the same sentence
      // } else if (quest.meetings.length === 1) {
      //   // second time. use only second sentences
      //   s = withChapter
      //     ? quest.dialogues.secondMeetingWithChapter
      //     : quest.dialogues.secondMeetingWithoutChapter
    } else {
      setActuallyEnableClose(true)
      // third time. use only third sentences
      s = withChapter ? quest.dialogues.runIntoWithChapter : quest.dialogues.runIntoWithoutChapter
    }
    console.debug('[Quest] sentences:', s, quest)
    setSentences(s)
    setSentenceIndex(0)
  }, [quest, withChapter])

  const [props, api] = useSprings(sentences.length, (i) => ({
    to: to(i, i === 0 ? initialDelay : 0),
    from: from(i),
  }))

  useEffect(() => {
    api.start((i) => {
      if (i < sentenceIndex) {
        return from(sentenceIndex - i)
      } else if (i === sentenceIndex) {
        return { x: 0, y: 0, opacity: 1, delay: i === 0 ? initialDelay : 0 }
      } else {
        return to(sentenceIndex + i)
      }
    })
  }, [sentenceIndex])

  const gotoNextSentence = () => {
    if (sentenceIndex < sentences.length - 1) {
      setSentenceIndex(sentenceIndex + 1)
    } else {
      // done with quest
      onComplete()
    }
  }

  const gotoPreviousSentence = () => {
    if (sentenceIndex > 0) {
      setSentenceIndex(sentenceIndex - 1)
    }
  }

  // normally quest is an arrray of questions and answers.
  return (
    <div className="Quest">
      {props.map(({ x, y, opacity }, i) => {
        const isPlayer = onlyYou ? true : i % 2 === 1

        return (
          <animated.div
            key={i}
            className="Quest_sentence"
            style={{
              opacity,
              pointerEvents: opacity > 0 ? 'auto' : 'none',
              transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`),
            }}
          >
            <DialogueCard
              asHtml={asHtml}
              avatar={isPlayer ? defaultAvatar : quest.avatar}
              sentence={sentences[i]}
              characterName={isPlayer ? defaultYouLabel : quest.characterName || quest.id}
              onClickNext={gotoNextSentence}
              onClickPrevious={gotoPreviousSentence}
              disableNext={i === sentences.length - 1}
              disablePrevious={!enablePrevious || sentenceIndex < 1}
              onClose={onComplete}
              onCompleteLabel={onCompleteLabel}
              enableClose={actuallyEnableClose}
            />
          </animated.div>
        )
      })}
    </div>
  )
}

export default Quest
