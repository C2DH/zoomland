import { useEffect, useState } from 'react'
import './Quest.css'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { Button, Col, Container, Row } from 'react-bootstrap'
import DialogueCard from './DialogueCard'

const to = (i) => ({
  x: 0,
  y: i * 200,
  opacity: 0,
})
const from = (i) => ({ x: 0, y: i * -200, opacity: 0 })

const Quest = ({ quest, withChapter = false, onComplete }) => {
  const [sentenceIndex, setSentenceIndex] = useState(-1)
  const [sentences, setSentences] = useState([])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        if (sentenceIndex < sentences.length - 1) {
          setSentenceIndex(sentenceIndex + 1)
        } else {
          onComplete()
        }
      }
      if (event.key === 'Escape') {
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

    console.debug('quest', quest)
    if (!Array.isArray(quest.meetings)) {
      // first time. use only initial sentences
      s = withChapter
        ? quest.dialogues.firstMeetingWithChapter
        : quest.dialogues.firstMeetingWithoutChapter
    } else if (quest.meetings.length === 1) {
      // second time. use only second sentences
      s = withChapter
        ? quest.dialogues.secondMeetingWithChapter
        : quest.dialogues.secondMeetingWithoutChapter
    } else {
      // third time. use only third sentences
      s = withChapter ? quest.dialogues.runIntoWithChapter : quest.dialogues.runIntoWithoutChapter
    }
    setSentences(s)
    setSentenceIndex(0)
  }, [quest, withChapter])

  const [props, api] = useSprings(sentences.length, (i) => ({
    to: to(i),
    from: from(i),
  }))

  useEffect(() => {
    api.start((i) => {
      if (i < sentenceIndex) {
        return from(sentenceIndex - i)
      } else if (i === sentenceIndex) {
        return { x: 0, y: 0, opacity: 1 }
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
        const isPlayer = i % 2 === 1
        return (
          <animated.div
            key={i}
            className="Quest_sentence"
            style={{
              opacity,
              transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`),
            }}
          >
            <DialogueCard
              avatar={isPlayer ? undefined : quest.avatar}
              sentence={sentences[i]}
              characterName={isPlayer ? 'You' : quest.characterName || quest.id}
              onClickNext={gotoNextSentence}
              onClickPrevious={gotoPreviousSentence}
              disableNext={sentenceIndex === sentences.length - 1}
              disablePrevious={sentenceIndex < 1}
              onClose={onComplete}
            />
          </animated.div>
        )
      })}
    </div>
  )
}

export default Quest
