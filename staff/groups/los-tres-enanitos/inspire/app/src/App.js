import React, { Component } from 'react';
import { Switch, Route, withRouter, Link, Redirect } from 'react-router-dom'
import ResultsPage from './containers/ResultsPage';
import HomePage from './containers/HomePage';
import RegisterPage from './containers/RegisterPage';
import LoginPage from './containers/LoginPage';
import ProfilePage from './containers/ProfilePage';

class App extends Component {

  render() {
    return (
      <div className="App">
        
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/search/photos/:query" render={props => <ResultsPage query={props.match.params.query} />}/>
          <Route path="/join" component={RegisterPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/profile/:id" render={props => <ProfilePage id={props.match.params.id} />}/>
        </Switch>

      </div>
    );
  }
}

export default App;
