import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Header from 'components/Header'
import QuestionSummary from 'components/QuestionSummary'
import { getQuestions } from 'api/Polls'

class Home extends Component {
  state = {
    questions: []
  }

  async componentDidMount() {
    this.setState({
      questions: await getQuestions()
    })
  }

  render() {
    return (
      <Container>
        <Header />
        <div className="card-columns">
          {this.state.questions.map((q, index) => (
            <QuestionSummary key={index} type="overview" data={q} />
          ))}
        </div>
      </Container>
    )
  }
}

export default Home
