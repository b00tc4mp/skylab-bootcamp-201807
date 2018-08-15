import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Files from './components/Files'

class App extends Component {
  render() {
    return <div className="full-height">
      <header>
        <h1 className="off">FILES</h1>
      </header>

      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/files" component={Files} />
      </Switch>

      <footer>
        <span className="power on">&#x23FB;</span>
      </footer>
    </div>
  }
}

export default App
