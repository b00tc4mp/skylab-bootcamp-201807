import React, {Component} from 'react';
import logic from '../logic'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'


export default class Login extends Component {

  static propTypes = {
    onLogin: PropTypes.func,
    errorLogin: PropTypes.string
  }
  state = {
    username: "",
    password: "",
  }

  keepUsername = event => this.setState({username: event.target.value})

  keepPassword = event => this.setState({password: event.target.value})



  handleLogin = event => {
    event.preventDefault()
    const {state: {username, password}} = this
    this.props.onLogin(username, password)
    this.setState({
      username: "",
      password: "",

    })
  }


  render() {
    return <div>

      <form onSubmit={this.handleLogin}>
        <input type="text" onChange={this.keepUsername} name="username" placeholder="username" autoFocus/>
        <input type="password" onChange={this.keepPassword} name="password" placeholder="password"/>
        <button type="submit">login</button>
      </form>
      {this.props.errorLogin && <h3>{this.props.errorLogin}</h3>}
    </div>
  }


}

