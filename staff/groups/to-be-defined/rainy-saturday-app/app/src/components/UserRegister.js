import React, {Component} from 'react';
import './UserRegisterAndLogin.css';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import logic from '../logic'
import {withRouter} from 'react-router-dom'



class UserRegister extends Component {

    state = {
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        profileimage: "",
        passwordvalid: true,
        errorRegister: null
}

    keepName = event => this.setState({ name: event.target.value })

    keepLastname = event => this.setState({ lastname: event.target.value })

    keepUsername = event => this.setState({ username: event.target.value })

    keepEmail = event => this.setState({ email: event.target.value })

    keepPassword = event => this.checkPwd(event.target.value)



    handleSubmit = event => {
        event.preventDefault()
        const {state: {name, lastname, username, email, password }} = this
        logic.registerUser(name, lastname, username, email, password)
        .then(() => 
        
        {this.setState({errorRegister: false})
        this.props.history.push('/login')
      })
        .catch()

        this.setState({
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        profileimage: "",
        
    
    })
    }
       
    checkPwd = str => {
      if ((str.length < 6) || (str.length > 15) || (str.search(/\d/) === -1) || (str.search(/[a-zA-Z]/) === -1) || (str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) !== -1)) {
        this.setState({passwordvalid: true})     
  } else {
      this.setState({passwordvalid: false})
  }
  return(this.setState({password: str}));
  }
    

  render() {
    return (
        
        <div id="comRainySaturdayUserRegisterAndLogin">
      <Form id="registerForm" onSubmit={this.handleSubmit}>
          <FormGroup>
          <Label for="name">Name</Label>
          <Input value={this.state.name} type="text" name="Name" onChange = {this.keepName} placeholder="Name" required/>
          <FormText color="muted">
            Name is required
          </FormText>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Lastname</Label>
          <Input value={this.state.lastname} type="text" name="Lastname" onChange = {this.keepLastname} placeholder="Lastname" required />
          <FormText color="muted">
            Lastname is required
          </FormText>
        </FormGroup>
        <FormGroup>
          <Label for="Username">Username</Label>
          <Input value={this.state.username} type="text" name="Username" onChange = {this.keepUsername} placeholder="Username" required />
          <FormText color="muted">
            Username is required 
          </FormText>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input value={this.state.email} type="email" name="email" onChange = {this.keepEmail} placeholder="Email" required />
          <FormText color="muted">
            Email is required
          </FormText>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input className={this.state.password ? (this.state.passwordvalid ? "comRainySaturdayUserRegisterAndLoginBorderFail" : "comRainySaturdayUserRegisterAndLoginBorderOk") : ""} value={this.state.password} type="password" name="password" onChange = {this.keepPassword} placeholder="Password" required />
          <FormText color="muted">
          Must contain at least one number and one uppercase and lowercase letter, and at least 6 to 15 characters
          </FormText>
        </FormGroup>
        {/* { && <ErrorPanel message={}/>} */}
        <FormGroup>
          <Label for="exampleFile">Profile Photo</Label>
          <Input type="file" name="Profile Photo"/>
          <FormText color="muted">
            Add your profile photo.
          </FormText>
        </FormGroup>
        <Button className="testButton" disabled={this.state.passwordvalid}>Submit</Button>
      </Form>
     </div>
    );
  }
}



export default withRouter(UserRegister)


