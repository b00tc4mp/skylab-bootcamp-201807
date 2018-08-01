import React, {Component} from 'react'
import NavBar  from "./NavBar";
import Landing from "./Landing";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';



class UserDelete extends Component{

    state ={
        
        Username:"",
        password:"",
        newUsername: "",
        newPassword:null,

    }


    keepNewUsername = event => this.setState({ newUsername: event.target.value })
    keepNewPassword = event => this.setState({ newPassword: event.target.value })
    
    onUpdate = event => {
        event.preventDefault()

        const { newUsername, password, newPassword } = this.state

        this.props.onUpdate(password, newUsername, newPassword)
    }

    render(){
        return <section>
        <h2>Profile</h2>
        <img src={require('../imagenes/logo-steam.png')} width="100vw" height="100vh" />
        <Form>
        <FormGroup>
          <Label for="text-user">Username</Label>
          <Input type="text" name="Username" id="username" placeholder="username" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
        </FormGroup>
        <Form>
        <Button>Delete</Button>
      </Form>
      </Form>
        
        
     </section>
    }
}

export default UserDelete;