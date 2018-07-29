import React, { Component } from 'react'
import { Card, CardTitle, Badge, Form, FormGroup, Input, Label, Button } from 'reactstrap'
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

const statsStyles = {
  fontWeight: 100,
  padding: '0.5rem',
  fontSize: '0.9rem'
}
class QuestionDetails extends Component {
  render() {
    return (
      <Card body style={cardStyles}>
        <div style={indexStyles}># {this.props.data.id}</div>
        <CardTitle style={titleStyles}>{this.props.data.question}</CardTitle>

        <Form>
          <FormGroup tag="fieldset">
            {this.props.data.choices &&
              this.props.data.choices.map((c, index) => (
                <FormGroup check key={index} className="mb-3">
                  <Label check>
                    <Input
                      type="radio"
                      name="choices"
                      value={c.id}
                      onChange={this.handleChange}
                      required
                    />
                    {c.choice}
                  </Label>

                  <Badge className="ml-3 mr-1" color="secondary" style={statsStyles}>
                    {c.votes} votes - {((c.votes / this.props.data.totalVotes) * 100).toFixed(2)}%
                  </Badge>
                </FormGroup>
              ))}
          </FormGroup>
        </Form>

        <div>
          <small className="muted" style={mutedStyles}>
            {this.props.data.published_at && new Date(this.props.data.published_at).toDateString()}{' '}
          </small>
        </div>
      </Card>
    )
  }
}

export default QuestionDetails
