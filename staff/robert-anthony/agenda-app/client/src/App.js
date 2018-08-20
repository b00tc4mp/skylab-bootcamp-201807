import React, {Component} from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Main from './components/Main'
import Contacts from './components/Contacts'
import Notes from './components/Notes'
import AddContact from './components/AddContact'
import AddNote from './components/AddNote'
import getToday from './helpers/getToday'

class App extends Component {




  state = {
    username: sessionStorage.getItem('username') || '',
    token: sessionStorage.getItem('token') || '',
    currentDate: getToday()
  }


  onLoggedIn = (username, token) => {
    this.setState({username, token})

    sessionStorage.setItem('username', username)
    sessionStorage.setItem('token', token)

  }

  onChangeCurrentDate = (newDate) => {
    this.setState({currentDate:newDate})
  }



  isLoggedIn() {
    return !!this.state.username
  }

  onLogout = e => {
    e.preventDefault()

    this.setState({username: '', token: ''})

    sessionStorage.clear()
  }

  render() {
    const {username, token,currentDate} = this.state

    return <div className="full-height">
      <header>
        <h1 className={this.isLoggedIn() ? 'on' : 'off'}>Contact</h1>
        {this.isLoggedIn() &&
        <nav><a href="/#/contacts">contacts</a> <a href="/#/notes">notes</a> <a href=""
                                                                                onClick={this.onLogout}>logout</a>
          <span className="blink">_</span>
        </nav>}
      </header>

      <Switch>
        <Route exact path="/" render={() => this.isLoggedIn() ? <Redirect to="/main"/> : <Landing/>}/>
        <Route path="/register" render={() => this.isLoggedIn() ? <Redirect to="/main"/> : <Register/>}/>
        <Route path="/main" render={() => this.isLoggedIn() ? <Main/> : <Landing/>}/>
        <Route path="/contacts"
               render={() => this.isLoggedIn() ? <Contacts token={token} username={username}/> : <Landing/>}/>
        <Route path="/notes"
               render={() => this.isLoggedIn() ? <Notes onChangeCurrentDate={this.onChangeCurrentDate} currentDate={currentDate} token={token} username={username}/> : <Landing/>}/>
        <Route path="/addcontact"
               render={() => this.isLoggedIn() ? <AddContact token={token} username={username}/> : <Landing/>}/>

        <Route path="/addnote"
               render={() => this.isLoggedIn() ? <AddNote currentDate={currentDate} token={token} username={username}/> : <Landing/>}/>

        <Route path="/login" render={() => this.isLoggedIn() ? <Redirect to="/main"/> :
          <Login onLoggedIn={this.onLoggedIn}/>}/>
      </Switch>

      <footer>
      </footer>
    </div>
  }
}

export default withRouter(App)
