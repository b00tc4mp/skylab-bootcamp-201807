import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText,Container } from 'reactstrap'
import logic from "../logic"
import swal from 'sweetalert2'
import { Redirect } from "react-router";


class UserSettings extends Component {

  state = {

    Username: logic._userUsername,
    newUsername: null,
    password: "",
    newPassword: null,
    redirectHome: false

  }

  keepUsername = event => this.setState({ Username: event.target.value })
  keepPassword = event => this.setState({ password: event.target.value })
  keepNewUsername = event => this.setState({ newUsername: event.target.value })
  keepNewPassword = event => this.setState({ newPassword: event.target.value })

  onUpdate = event => {
    event.preventDefault()

    const { newUsername, password, newPassword } = this.state

    logic.updateUser(password, newUsername, newPassword)
      .then(() => {
        this.setState({
        Username: logic._userUsername,
        password: logic._userPassword
      })
    })
    .then(() => {
      swal({
        title: 'Success! :)',
        text: "Update successful",
        type: 'success',
        confirmButtonText: 'Nice!'
      })
      .then(() => this.setState({
        redirectHome: true
      }))
    })
      .catch((err) => swal({
        title: 'Failed! :(',
        text: err,
        type: 'error',
        confirmButtonText: 'Try again'
      })
    )


  }

  onDelete = event => {
    event.preventDefault()
    const { password } = this.state
    logic.unregisterUser(password)
      .then(this.props.handleLogout)
      .catch((err) => swal({
        title: 'Failed! :(',
        text: err,
        type: 'error',
        confirmButtonText: 'Try again'
      }))
  }

  render() {
    return <div>
   {this.state.redirectHome && <Redirect to="/home"/> } 
    <Container className="mt-5">
      <h2>Update</h2>
      <Form onSubmit={this.onUpdate}>
        <FormGroup>
          <Label for="text-user">Username</Label>
          <Input type="text" disabled value={this.state.Username} />
        </FormGroup>
        <FormGroup>
          <Label for="text-user">New Username</Label>
          <Input type="text" name="Username" placeholder="New Username" onChange={this.keepNewUsername} />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" placeholder="Password" onChange={this.keepPassword} />
        </FormGroup>
        <FormGroup>
          <Label for="newPassword">New password</Label>
          <Input type="password" name="newpassword" placeholder="New Password" onChange={this.keepNewPassword} />
        </FormGroup>
        <Button type="submit" className="btn-success">Update</Button>
      </Form>
      </Container>

      <Container className="mt-5">
        <h2>Delete profile</h2>
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
      </Container>
      </div>




    


  }
}

export default UserSettings