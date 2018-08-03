import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
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
    loggedIn: logic.loggedIn,
    loginError: '',
    registerError: ''
  }

  handleLoginSubmit = (formData) => {

    logic.loginUser(formData.username, formData.password)
      .then(() => {
        this.setState({ loggedIn: true })
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ loginError: `Upps, ${error.message}` })
      })
  }

  handleRegisterSubmit = (formData) => {

    const { username, password, ...others } = formData
    logic.registerUser(username, password, others)
      .then(() => {
        logic.loginUser(username, password)
          .then(() => {
            this.setState({ loggedIn: true })
            this.props.history.push('/')
          })
      })
      .catch(error => {
        this.setState({ registerError: `Upps, ${error.message}` })
      })
  }

  handleLogout = () => {
    logic.logout()
    this.setState({ loggedIn: false })
    if (this.props.location.pathname !== '/')
      this.props.history.push('/')
  }

  render() {
    return (
      <div className="App">

        <Switch>
          <Route exact path="/" render={() => <HomePage loggedIn={this.state.loggedIn} />} />
          <Route path="/search/photos/:query" render={props => <ResultsPage loggedIn={this.state.loggedIn} query={props.match.params.query} />} />
          <Route path="/join" render={() => <RegisterPage loggedIn={this.state.loggedIn} onRegisterSubmit={this.handleRegisterSubmit} registerError={this.state.registerError} />} />
          <Route path="/login" render={() => <LoginPage loggedIn={this.state.loggedIn} onLoginSubmit={this.handleLoginSubmit} loginError={this.state.loginError} />} />
          <Route strict path="/profile/edit" render={() => !this.state.loggedIn ? <Redirect to="/login" /> : <EditProfilePage loggedIn={this.state.loggedIn} />} />
          <Route path="/profile/:id" render={props => <ProfilePage loggedIn={this.state.loggedIn} id={props.match.params.id} />} />
          <Route path="/photos/:id" render={props => <PhotoDetailPage loggedIn={this.state.loggedIn} id={props.match.params.id} />} />
          <Route path="/logout" render={() => <LogoutPage loggedIn={this.state.loggedIn} onLogout={this.handleLogout} />} />
        </Switch>

      </div>
    );
  }
}

export default withRouter(App);
