import { Card } from 'react-bootstrap'
import Author from './Author'
import React from 'react'

const ChapterListItem = ({ chapter, isFound = false }) => {
  return (
    <Card className={`${isFound ? 'is-found' : ''} ChapterListItem`}>
      <Card.Body>
        <Card.Title>
          {chapter.n > 0 && <div>{chapter.n}</div>}
          {chapter.title}
        </Card.Title>
        <Card.Text>{chapter.excerpt}</Card.Text>
        <b>authors</b>
        <Card.Text>
          {chapter.authors.map((a, i) => {
            return (
              <div className="d-inline-block me-1" key={i}>
                <Author className="d-inline" name={a} />
                {i < chapter.authors.length - 1 && <span>,</span>}
              </div>
            )
          })}
        </Card.Text>
        {Array.isArray(chapter.keywords) && (
          <Card.Text>
            <b>keywords</b>
            {chapter.keywords.join(', ')}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  )
}

export default ChapterListItem
