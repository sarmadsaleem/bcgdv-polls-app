import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './views/Home'
import Questions from './views/Questions'
import NotFound from './views/NotFound'
import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/question/:id" component={Questions} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App
