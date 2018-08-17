import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import HomePage from './containers/HomePage'

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <Switch>
          <Route exact path="/" render={() => <HomePage />} />
        </Switch>

      </div>
    )
  }
}

export default App
