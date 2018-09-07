import React, { Component } from 'react';
import logic from '../logic'
import {withRouter} from 'react-router-dom'
import PropTypes from "prop-types"
import ReactRouterPropTypes from 'react-router-prop-types';

 class Register extends Component {

   static propTypes = {
     history: ReactRouterPropTypes.history.isRequired,

   }


   keepPassword = event => this.setState({password: event.target.value})

  keepUsername = event => this.setState({username: event.target.value})


  state = {
    username:null,
    password:null
  }


  handleSubmit = event => {
    event.preventDefault()


    const {state: {username, password}} = this
    logic.register(username,password)
      .then(() => {

        this.setState({
          username: "",
          password: "",
          errorRegister: false
        })
        this.props.history.push('/login')

      })
      .catch(({message}) => {
        this.setState({
          errorRegister: message,
          username: "",
          password: "",
        })

      })


  }


  render() {

    return  <div >
    <h2>Register</h2>
      <form onSubmit={this.handleSubmit} method="post">
        <input type="text" name="username" onChange={this.keepUsername} placeholder="username" autoFocus/>
          <input type="password" name="password" onChange={this.keepPassword}  placeholder="password"/>
            <button type="submit">register</button>
      </form>
      {this.state.errorRegister && <h3>{this.state.errorRegister}</h3>}
    </div>
  }


  }

export default withRouter(Register)

