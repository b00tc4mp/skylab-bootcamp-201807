import React, {Component} from 'react';
import './UserRegisterAndLogin.css';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import logic from '../logic'



export default class UserPage extends Component {

    state = {
        username: "",
        newusername:"",
        email: "",
        newemail: "",
        password: "",
        newpassword:"",
        profileimage: "",
        passwordvalid: true
}


    keepUsername = event => this.setState({ username: event.target.value })

    keepNewUsername = event => this.setState({ newusername: event.target.value })

    keepEmail = event => this.setState({ email: event.target.value })

    keepNewEmail = event => this.setState({ newemail: event.target.value })

    keepPassword = event => this.setState({password: event.target.value})

    keepNewPassword = event => this.checkPwd(event.target.value)



    handleSubmit = event => {
        event.preventDefault()
        const {state: {password, newusername, newpassword, newemail }} = this
        logic.updateUser(password, newusername, newpassword, newemail)
        this.setState({
        username: "",
        newusername: "",
        email: "",
        newemail:"",
        password: "",
        newpassword: "",
        profileimage: "",
    })
    }
       
    checkPwd = str => {
      if ((str.length < 6) || (str.length > 15) || (str.search(/\d/) === -1) || (str.search(/[a-zA-Z]/) === -1) || (str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) !== -1)) {
        this.setState({passwordvalid: true})     
  } else {
      this.setState({passwordvalid: false})
  }
  return(this.setState({newpassword: str}));
  }
    

  render() {
    return (
        
        <div id="comRainySaturdayUserRegisterAndLogin">
      <Form id="updateForm" onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="Username">Username</Label>
          <Input value={this.state.username} type="text" name="Username" onChange = {this.keepUsername} placeholder="Username"/>
        </FormGroup>
        <FormGroup>
          <Label for="NewUsername">New Username</Label>
          <Input value={this.state.newusername} type="text" name="Username" onChange = {this.keepNewUsername} placeholder="New Username"/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input value={this.state.email} type="email" name="email" onChange = {this.keepEmail} placeholder="Email" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">New Email</Label>
          <Input value={this.state.newemail} type="email" name="newemail" onChange = {this.keepNewEmail} placeholder="New Email"/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input value={this.state.password} type="password" name="password" onChange = {this.keepPassword} placeholder="Password" required />
        </FormGroup>
        <FormGroup>
          <Label for="exampleNewPassword">New Password</Label>
          <Input className={this.state.newpassword ? (this.state.passwordvalid ? "comRainySaturdayUserRegisterAndLoginBorderFail" : "comRainySaturdayUserRegisterAndLoginBorderOk") : ""} value={this.state.newpassword} type="password" onChange = {this.keepNewPassword} placeholder="New Password" />
          <FormText color="muted">
          Must contain at least one number and one uppercase and lowercase letter, and at least 6 to 15 characters
          </FormText>
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">Profile Photo</Label>
          <Input type="file" name="Profile Photo" />
          <FormText color="muted">
            Change your profile photo.
          </FormText>
        </FormGroup>
        <Button className="testButton" disabled={this.state.passwordvalid}>Submit</Button>
      </Form>
     </div>
    );
  }
}






