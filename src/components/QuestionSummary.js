import React, { Component } from 'react'
import { Card, CardTitle, Badge } from 'reactstrap'
import { Link } from 'react-router-dom'

const cardStyles = {
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  marginBottom: '1.25rem',
  borderRadius: 0,
  border: 0
}

const titleStyles = {
  marginBottom: '1rem',
  fontWeight: 300,
  color: '#303030',
  fontSize: '1.25rem'
}

const choicesBadgeStyles = {
  fontSize: '1rem',
  fontWeight: 100,
  borderRadius: 0
}

const mutedStyles = {
  color: '#808080',
  fontWeight: 100
}

const indexStyles = {
  fontWeight: 100,
  marginBottom: '0.5rem',
  fontSize: '2rem',
  color: '#808080'
}

class QuestionSummary extends Component {
  render() {
    return (
      <Card body style={cardStyles}>
        <div style={indexStyles}># {this.props.data.id}</div>
        <CardTitle style={titleStyles}>
          <Link to={`/question/${this.props.data.id}`} style={titleStyles}>
            {this.props.data.question}
          </Link>
        </CardTitle>

        <div className="mt-2 mb-3">
          <Badge style={choicesBadgeStyles} color="secondary">
            Choices - {this.props.data.choices.length}
          </Badge>
        </div>

        <div>
          <small className="muted" style={mutedStyles}>
            {this.props.data.published_at && new Date(this.props.data.published_at).toDateString()}{' '}
          </small>
        </div>
      </Card>
    )
  }
}

export default QuestionSummary
