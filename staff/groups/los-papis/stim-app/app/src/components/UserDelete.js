import React, {Component} from 'react'
import NavBar  from "./NavBar";
import Landing from "./Landing";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import logic from "../logic"


class UserDelete extends Component{

    state ={
        
        Username:"",
        newUsername:"",
        password:"",
        newPassword:"",
        
    }

    keepUsername = event => this.setState({ Username: event.target.value })
    keepPassword = event => this.setState({ password: event.target.value })
    keepNewUsername = event => this.setState({ newUsername: event.target.value })
    keepNewPassword = event => this.setState({ newPassword: event.target.value })
    
    onUpdate = event => {
        event.preventDefault()

        const { newUsername, password, newPassword } = this.state

        logic.updateUser(password, newUsername, newPassword)
    }
     
    onDelete = event =>{
        event.preventDefault()
        const {password} = this.state
        logic.unregisterUser(password)
    }



    render(){
        return <section>
        <h2>Update</h2>
        <img src={require('../imagenes/logo-steam.png')} width="100vw" height="100vh" />
        <Form onSubmit={this.onUpdate}>
        <FormGroup>
          <Label for="text-user">Username</Label>
          <Input type="text" name="Username" id="username" placeholder="username" onChange={this.keepUsername} />
        </FormGroup>
        <FormGroup>
          <Label for="text-user">newUsername</Label>
          <Input type="text" name="Username" id="username" placeholder="username" onChange={this.keepNewUsername} />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="password" onChange={this.keepPassword} />
        </FormGroup>
        <FormGroup>
          <Label for="newPassword">New password</Label>
          <Input type="password" name="newpassword" id="newPassword" placeholder=" new password" onChange={this.keepNewPassword} />
        </FormGroup>
        <Form>
        <Button>Update</Button>
      </Form>
      </Form>
          
         
        <div>
        <h2>Delete profile</h2>
        <img src={require('../imagenes/logo-steam.png')} width="100vw" height="100vh" />
        <Form onSubmit={this.onDelete}>
        <FormGroup>
          <Label for="text-user">Username</Label>
          <Input type="text" name="Username" id="username" placeholder="username" onChange={this.keepUsername} />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="password " onChange={this.keepPassword} />
        </FormGroup>
        <Form>
        <Button>Delete</Button>
      </Form>
      </Form>
      </div>





        </section>


    }
}

export default UserDelete;