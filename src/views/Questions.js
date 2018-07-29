import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Header from 'components/Header'
import QuestionDetails from 'components/QuestionDetails'
import { getQuestionDetails } from 'api/Polls'

class Questions extends Component {
  state = {
    questionDetails: {}
  }

  async componentDidMount() {
    this.setState({
      questionDetails: await getQuestionDetails(parseInt(this.props.match.params.id, 10))
    })
  }

  render() {
    return (
      <Container>
        <Header />
        <QuestionDetails data={this.state.questionDetails} />
      </Container>
    )
  }
}

export default Questions
