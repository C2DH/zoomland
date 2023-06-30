import React from 'react'
import { usePlayerStore, NumberOfChapters, useWorldStore } from '../store'
import Timer from './Timer'
import './Counter.css'

export const Counter = () => {
  const [progress, collectedChapters] = usePlayerStore((state) => [
    state.progress,
    state.collectedChapters,
  ])

  const HumanreadableProgress = Math.round(progress * 100)
  return (
    <div className="counter">
      <div className="counter-blocks">
        <div className="counter-col">
          <span>Goal:</span>
          {HumanreadableProgress} %
        </div>
        <div className="counter-col">
          <span>Chapters:</span>
          {collectedChapters.length} / {NumberOfChapters}
        </div>
        <div className="counter-col">
          <span>Time Left:</span>
          <div className="Timer">
            <Timer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Counter
