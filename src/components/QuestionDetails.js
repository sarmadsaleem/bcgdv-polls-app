import React, { Component } from 'react'
import { Card, CardTitle, Badge, Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { castVote } from 'api/Polls/'

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
  state = {
    selectedOption: '',
    isSubmitted: false,
    timestamp: Date.now()
  }

  handleChange(event) {
    this.setState({ selectedOption: event.target.value })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const questionId = parseInt(this.props.data.questionDetails.id, 10)
    const choice = this.state.selectedOption
    if (questionId && choice) {
      this.setState({
        isSubmitted: true
      })
      const response = await castVote(questionId, choice)
      this.props.sendData(true)
    }
  }

  render() {
    const questionDetails = this.props.data.questionDetails
    return (
      <Card body style={cardStyles}>
        <div style={indexStyles}># {questionDetails.id}</div>
        <CardTitle style={titleStyles}>{questionDetails.question}</CardTitle>

        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup tag="fieldset">
            {questionDetails.choices &&
              questionDetails.choices.map((c, index) => (
                <FormGroup check key={index} className="mb-3">
                  <Label check>
                    <Input
                      type="radio"
                      name="choices"
                      value={c.id}
                      onChange={this.handleChange.bind(this)}
                      required
                    />
                    {c.choice}
                  </Label>

                  <Badge className="ml-3 mr-1" color="secondary" style={statsStyles}>
                    {c.votes} votes - {((c.votes / questionDetails.totalVotes) * 100).toFixed(2)}%
                  </Badge>
                </FormGroup>
              ))}
          </FormGroup>
          <Button
            type="submit"
            color="primary"
            className="mb-3"
            disabled={this.state.isSubmitted ? true : false}
          >
            {this.state.isSubmitted ? 'Submitted' : 'Submit'}
          </Button>
        </Form>

        <div>
          <small className="muted" style={mutedStyles}>
            {questionDetails.published_at && new Date(questionDetails.published_at).toDateString()}{' '}
          </small>
        </div>
      </Card>
    )
  }
}

export default QuestionDetails
