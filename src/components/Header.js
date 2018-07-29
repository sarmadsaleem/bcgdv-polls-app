import React, { Component } from 'react'

const headingStyles = {
  color: '#fff',
  textShadow: '0px 0px 10px rgba(0,0,0,0.2)',
  marginTop: '1.5rem'
}

const leadStyles = {
  color: '#fff',
  fontWeight: '100',
  fontSize: '2rem',
  padding: 0,
  margin: '-0.5rem 0 0.5rem 0',
  textShadow: '0px 0px 10px rgba(0,0,0,0.2)'
}

class Header extends Component {
  render() {
    return (
      <div>
        <h1 style={headingStyles}>
          Most Epic Polls App Ever!{' '}
          <span role="img" aria-label="Rocket">
            🚀
          </span>
        </h1>
        <div className="lead" style={leadStyles}>
          Puts all other polling apps to shame{' '}
          <span role="img" aria-label="Rock on">
            🤟
          </span>
        </div>
      </div>
    )
  }
}

export default Header
