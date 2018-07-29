import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'

class NotFound extends Component {
  render() {
    return (
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        <h1 style={{ color: '#fff' }} className="text-center">
          Woopsie! Something went wrong, let's go back <Link to="/">home</Link>
        </h1>
      </Container>
    )
  }
}

export default NotFound
