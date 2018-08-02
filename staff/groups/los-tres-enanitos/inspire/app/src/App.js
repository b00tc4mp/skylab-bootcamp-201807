import React, { Component } from 'react';
import { Switch, Route, withRouter, Link, Redirect } from 'react-router-dom'
import ResultsPage from './containers/ResultsPage';
import HomePage from './containers/HomePage';
import RegisterPage from './containers/RegisterPage';
import LoginPage from './containers/LoginPage';
import ProfilePage from './containers/ProfilePage';
import EditProfilePage from './containers/EditProfilePage';
import LogoutPage from './containers/LogoutPage';
import PhotoDetailPage from './containers/PhotoDetailPage';
import logic from './logic'

class App extends Component {

  state = {
    loggedIn: logic.loggedIn
  }

  render() {
    return (
      <div className="App">

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/search/photos/:query" render={props => <ResultsPage query={props.match.params.query} />} />
          <Route path="/join" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route strict path="/profile/edit" render={() => !this.state.loggedIn ? <Redirect to="/login" /> : <EditProfilePage />} />
          <Route strict path="/profile/:id" render={props => <ProfilePage id={props.match.params.id} />} />
          <Route path="/photos/:id" render={props => <PhotoDetailPage id={props.match.params.id} />} />
          <Route path="/logout" component={LogoutPage} />
          {/* <Route path="/logout" render={() => {
            this.setState({ loggedIn: logic.loggedIn })
            return <LogoutPage />
          }} /> */}
        </Switch>

      </div>
    );
  }
}

export default App;
