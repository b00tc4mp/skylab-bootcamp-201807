import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import LoginPage from './containers/LoginPage';
import LogoutPage from './containers/LogoutPage';
import WallPage from './containers/WallPage';
import RegisterPage from './containers/RegisterPage';
import ProfilePage from './containers/ProfilePage';
import CreationPostPage from './containers/CreationPostPage';
import EditProfilePage from './containers/EditProfilePage';
import ChangePasswordPage from './containers/ChangePasswordPage';
import PostDetailPage from './containers/PostDetailPage';

class App extends Component {
  state = {
    loggedInUsername: sessionStorage.getItem('username') || '',
    token: sessionStorage.getItem('token') || ''
  }

  onLoggedIn = (username, token) => {
    this.setState({ loggedInUsername: username, token })

    sessionStorage.setItem('username', username)
    sessionStorage.setItem('token', token)

    this.props.history.push('/')
  }

  isLoggedIn() {
    return !!this.state.loggedInUsername
  }

  handleLogout = () => {
    this.setState({ loggedInUsername: '', token: '' })

    sessionStorage.clear()

    if (this.props.location.pathname !== '/') this.props.history.push('/')
  }

  onRegistered = (username, token) => this.onLoggedIn(username, token)

  render() {
    const { loggedInUsername, token } = this.state
    return (
      <div className="App">
        
        <Switch>
          <Route exact path="/" render={() => !this.isLoggedIn() ? <Redirect to="/accounts/login" /> : (
            <WallPage
              loggedInUsername={loggedInUsername}
              token={token}
            />
          )} />
          <Route exact path="/accounts/login" render={() => this.isLoggedIn() ? <Redirect to="/" /> : <LoginPage onLoggedIn={this.onLoggedIn} />} />
          <Route exact path="/accounts/logout" render={() => <LogoutPage onLogout={this.handleLogout} />} />
          <Route exact path="/accounts/register" render={() => this.isLoggedIn() ? <Redirect to="/" /> : <RegisterPage onRegistered={this.onRegistered} />} />
          <Route exact path="/accounts/edit" render={() => !this.isLoggedIn() ? <Redirect to="/accounts/login" /> : (
            <EditProfilePage
              loggedInUsername={loggedInUsername}
              token={token}
            />
          )
          } />
          <Route exact path="/accounts/password/change" render={() => !this.isLoggedIn() ? <Redirect to="/accounts/login" /> : (
            <ChangePasswordPage
              loggedInUsername={loggedInUsername}
              token={token}
            />
          )
          } />
          <Route exact path="/p/new" render={() => !this.isLoggedIn() ? <Redirect to="/accounts/login" /> : <CreationPostPage loggedInUsername={loggedInUsername} token={token} />} />
          <Route path="/p/:id" render={props => (
            <PostDetailPage
              postId={props.match.params.id}
              loggedInUsername={loggedInUsername}
              token={token}
            />
          )} />
          <Route path="/:username" render={props => (
            <ProfilePage
              username={props.match.params.username}
              loggedInUsername={loggedInUsername}
              token={token}
            />
          )} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
