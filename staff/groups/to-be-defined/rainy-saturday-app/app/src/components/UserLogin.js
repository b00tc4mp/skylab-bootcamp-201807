import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import PropTypes from 'prop-types';
import "./UserRegisterAndLogin.css"
import logic from '../logic'

export default class UserLogin extends Component {
  
    state = {
        username: "",
        password: ""   
}

keepUsername = event => this.setState({ username: event.target.value })

keepPassword = event => this.setState({ password: event.target.value })

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
    return (
        <div id="comRainySaturdayUserRegisterAndLogin">
      <Form onSubmit={this.handleLogin}>
        <FormGroup>
          <Label for="exampleUsername">Username</Label>
          <Input value={this.state.username} type="text" name="Username" onChange = {this.keepUsername} placeholder="Username" required/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input value={this.state.password} type="password" onChange = {this.keepPassword} name="password" placeholder="Password" required/>
        </FormGroup>
        <Button>Login</Button>
      </Form>
      </div>
    );
  }
}