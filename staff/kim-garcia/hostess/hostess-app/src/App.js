import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import logic from '../src/logic'
import Landing from './components/Landing'
//quizas no se usa la logica
///importar PAGS aqui

class App extends Component {



  
  render() {
    return (
      <div>
        <h1>wellcome to hostess</h1>

        <Switch>
          <Route exact path="/landing" render={() => <Landing /> } />
        </Switch>

      </div>


     
    )
  }
}

export default withRouter(App)
