import React, { Component } from 'react';
import './App.css';
import HomePage from './components/HomePage'
import Register from './components/Register'
import Login from './components/Login'
import Files from './components/Files'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import logic from './logic'

class App extends Component {

  state={
    list: [],
    user: ''
  }

  goToRegister = (event) => {
    event.preventDefault()
    this.props.history.push('/Register')
  }

  goToLogin = (event) => {
    event.preventDefault()
    this.props.history.push('/Login')
  }

  onRegister = (username,password) =>{
    logic.register(username,password)
      .then(() => {
        //Todo sweet alert
        this.props.history.push('/Login')
      })
  }

  onLogin = (username,password) =>{
    logic.authenticate(username,password)
      .then(() => {
        this.listFiles(username).then(() => {
          this.setState({user:username})
          this.props.history.push('/Files')
        })
      })
  }

  listFiles = (username) =>{
    return logic.listFiles(username)
      .then(res => {
        this.setState({
          list: res
        })
      })
  }

  uploadFile = (file) =>{
    logic.saveFile(this.state.user,file)
      .then(() => {
      })
  }

  onRemove = (file) =>{
      logic.removeFile(this.state.user,file)
       .then(() => {
          return logic.listFiles(this.state.user)
            .then(res => {
              this.setState({
                list: res
              })
          })
          
       })
  }

  render() {
    return (
      <Switch>
            <Route exact path="/" render={() => <HomePage onRegister={this.goToRegister} onLogin={this.goToLogin}/>}/>
            <Route path="/Register" render={() => <Register onRegister={this.onRegister}/>}/>
            <Route path="/Login" render={() => <Login onLogin={this.onLogin}/>}/>
            <Route path="/Files" render={() => <Files listFiles={this.state.list} onRemove={this.onRemove} uploadFile={this.uploadFile}/>}/>
      </Switch>
    );
  }
}

export default withRouter(App);
