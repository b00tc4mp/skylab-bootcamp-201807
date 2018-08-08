import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import PropTypes from 'prop-types';
import "./UserRegisterAndLogin.css"
// import logic from '../logic'
import ErrorPanel from './ErrorPanel'
import UserSuccesful from './SweetalertUser'



export default class UserLogin extends Component {
  
  state = {
    username: "",
    password: "", 
    title:"Login"
  }
  
  keepUsername = event => this.setState({ username: event.target.value })
  
  keepPassword = event => this.setState({ password: event.target.value })
    
  alert = () => UserSuccesful(this.state.title)
  
  handleLogin = event => {
    event.preventDefault()
    const {state: {username, password}, alert} = this
    this.props.onLogin(username, password, alert)
    this.setState({
      username: "",
      password: "",
      
    })
    
  }
    render() {
    return (
        <div  className="mt-5" id="comRainySaturdayUserRegisterAndLogin">
      <Form id="comRainySaturdayUserLoginForm" onSubmit={this.handleLogin}>
        <FormGroup>
          <Label for="exampleUsername">Username</Label>
          <Input type="text" value={this.state.username} name="Username" onChange = {this.keepUsername} placeholder="Username" required autoFocus="true"/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input value={this.state.password} type="password" onChange = {this.keepPassword} name="password" placeholder="Password" required/>
        </FormGroup>
        {this.props.errorLogin && <ErrorPanel message={this.props.errorLogin}/>}
        <Button>Login</Button>
      </Form>
      </div>
    );
  }
}