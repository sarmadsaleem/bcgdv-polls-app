import React, { Component } from 'react'
import { Container, Row, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import Header from 'components/Header'
import QuestionDetails from 'components/QuestionDetails'
import { getQuestions, getQuestionDetails } from 'api/Polls'

const buttonStyles = {
  color: '#fff',
  borderColor: '#fff'
}

class Questions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionDetails: {},
      prev: false,
      current: false,
      next: false,
      refresh: false,
      totalQuestions: 0,
      isLoading: true
    }
  }

  async getData(val, state = this.state) {
    await this.initializeState()
  }

  async navHandler(e) {
    this.setState({
      isLoading: true
    })

    await this.initializeState()
  }

  async initializeState() {
    const allQuestions = await getQuestions()
    const questionId = parseInt(this.props.match.params.id, 10)
    const details = await getQuestionDetails(questionId)
    const currentId = allQuestions.findIndex(q => q.id === questionId)
    const nextId = allQuestions[currentId + 1] ? allQuestions[currentId + 1].id : false
    const prevId = allQuestions[currentId - 1] ? allQuestions[currentId - 1].id : false
    const totalQuestions = allQuestions.length

    this.setState({
      questionDetails: details,
      prev: prevId,
      current: currentId,
      next: nextId,
      totalQuestions: totalQuestions,
      isLoading: false
    })
  }

  async componentDidMount() {
    await this.initializeState()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      refresh: Date.now()
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Header />
        </Row>

        <Row>
          <div className="text-center pt-2 pb-3" style={{ color: '#fff' }}>
            <h4>
              {this.state.current + 1} of {this.state.totalQuestions}
            </h4>
          </div>
        </Row>

        <Row className={!this.state.isLoading && `d-none`}>
          <div className="lds-ripple">
            <div />
            <div />
          </div>
        </Row>

        <Row className={this.state.isLoading && `d-none`}>
          <QuestionDetails
            key={this.props.match.params.id}
            data={this.state}
            sendData={this.getData.bind(this)}
          />
        </Row>

        <Row>
          <Link to="/">
            <Button outline color="secondary" style={buttonStyles}>
              Back to questions
            </Button>
          </Link>

          {this.state.prev && (
            <Link
              to={`/question/${this.state.prev}`}
              className="ml-2"
              onClick={this.navHandler.bind(this)}
            >
              <Button
                outline
                color="secondary"
                style={buttonStyles}
                onClick={this.navHandler.bind(this)}
              >
                Prev
              </Button>
            </Link>
          )}

          {this.state.next && (
            <Link
              to={`/question/${this.state.next}`}
              className="ml-2"
              onClick={this.navHandler.bind(this)}
            >
              <Button
                outline
                color="secondary"
                style={buttonStyles}
                onClick={this.navHandler.bind(this)}
              >
                Next
              </Button>
            </Link>
          )}
        </Row>
      </Container>
    )
  }
}

export default Questions
