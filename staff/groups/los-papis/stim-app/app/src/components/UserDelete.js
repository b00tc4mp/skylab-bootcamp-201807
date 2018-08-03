import React, { Component } from 'react'
import NavBar from "./NavBar";
import Landing from "./Landing";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import logic from "../logic"
import images from "../images/logo-steam.png"
import "../styles/style-profile.css"



class UserDelete extends Component {

  state = {

    Username: logic._userUsername,
    newUsername: "",
    password: logic._userPassword,
    newPassword: "",

  }

  keepUsername = event => this.setState({ Username: event.target.value })
  keepPassword = event => this.setState({ password: event.target.value })
  keepNewUsername = event => this.setState({ newUsername: event.target.value })
  keepNewPassword = event => this.setState({ newPassword: event.target.value })

  onUpdate = event => {
    event.preventDefault()

    const { newUsername, password, newPassword } = this.state

    logic.updateUser(password, newUsername, newPassword)
      .then(res => {
        this.setState({
        Username: logic._userUsername,
        password: logic._userPassword
      })
    })
      .catch(err => console.warn(err))


  }

  onDelete = event => {
    event.preventDefault()
    const { password } = this.state
    logic.unregisterUser(password)
      .then(this.props.handleLogout)
  }

  render() {
    return <section>
      <div className="container1">
      <h2>Update</h2>
      <img src={images} width="100vw" height="100vh" />
      <Form onSubmit={this.onUpdate}>
        <FormGroup>
          <Label for="text-user">Username</Label>
          <Input type="text" disabled value={this.state.Username} />
        </FormGroup>
        <FormGroup>
          <Label for="text-user">newUsername</Label>
          <Input type="text" name="Username" placeholder="New username" onChange={this.keepNewUsername} />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" placeholder="password" onChange={this.keepPassword} />
        </FormGroup>
        <FormGroup>
          <Label for="newPassword">New password</Label>
          <Input type="password" name="newpassword" placeholder=" new password" onChange={this.keepNewPassword} />
        </FormGroup>
        <Button type="submit" className="btn-success">Update</Button>
      </Form>
      </div>


      <div className="container2">
        <h2>Delete profile</h2>
        <img src={images} width="100vw" height="100vh" />
        <Form onSubmit={this.onDelete}>
          <FormGroup>
            <Label for="text-user">Username</Label>
            <Input type="text" disabled value={this.state.Username} />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" placeholder="password " onChange={this.keepPassword} />
          </FormGroup>
          <Button type="submit" id="button-red" className="btn-danger">Delete</Button>
        </Form>
      </div>





    </section>


  }
}

export default UserDelete;