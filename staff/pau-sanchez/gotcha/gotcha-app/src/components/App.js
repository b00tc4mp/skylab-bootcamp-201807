import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Landing from '../pages/landing'
import Register from '../pages/register'
import Login from '../pages/login'
import Profile from '../pages/profile'
import Home from '../pages/home'
import Editor from '../pages/editor'
import Notebooks from '../pages/notebooks'
import Faq from '../pages/faq'
import About from '../pages/about'

import Navbar from './Navbar'

class App extends Component {

  state = {
    name: sessionStorage.getItem('name') || '',
    token: sessionStorage.getItem('token') || '',
    landingurl: sessionStorage.getItem('landingurl') || '',
    userId: ''
  }
  
  onLoggedIn = (userId, token) => {
    this.setState({ userId, token })

    sessionStorage.setItem('userId', userId)
    sessionStorage.setItem('token', token)

    this.props.history.push('/home')
  }

  isLoggedIn() {
    return !!this.state.token
  }





  render() {

    const { userId, token } = this.state

    return (
      <Router>
        <div>
          <Navbar />

            <Switch>
              <Route path='/' exact component={Landing} />
              <Route path='/register' render={() => this.isLoggedIn() ? <Redirect to='/home'/> : <Register/>} />
              <Route path='/login' render={() => this.isLoggedIn() ? <Redirect to='/home' /> : <Login onLoggedIn={this.onLoggedIn} />} />
              <Route path='/profile' render={() => this.isLoggedIn() ? <Profile /> : <Redirect to='/' /> }/>
              <Route path='/home' render={() => this.isLoggedIn() ? <Home userId={userId} token={token}/> : <Redirect to='/' />} />
              <Route path='/editor'  render={() => this.isLoggedIn() ? <Editor userId={userId} token={token}/> : <Redirect to='/'/>} />
              <Route path='/notebooks' render={() => this.isLoggedIn() ? <Notebooks userId={userId} token={token}/> : <Redirect to='/'/>} />
              <Route path='/faq' component={Faq} />
              <Route path='/about' component={About} />
              <Route render={() => <h1>404</h1>} />
            </Switch>
        </div>
      </Router>
    );
  }
}

export default withRouter(App)
