import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "./Login.css"


export default class Login extends React.Component {

render() {
    return (
        <div  className="mt-5" id="RecipeLogin">
      <Form id="LoginForm">
        <FormGroup>
          <Label for="exampleUsername">Username</Label>
          <Input type="text" name="Username" placeholder="Username" required autoFocus="true"/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" placeholder="Password" required/>
        </FormGroup>
        <Button>Login</Button>
      </Form>
      </div>
    );
  }
}

