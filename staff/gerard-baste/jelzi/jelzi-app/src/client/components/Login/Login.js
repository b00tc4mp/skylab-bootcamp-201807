import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./Login.css";
import { logic } from "../../logic";
import UserSuccesful from "../SuccedPanel/UserSuccesful";
import UserError from "../ErrorPanel/UserError";

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
    title: "Login",
    errorLogin: null
  };

  keepEmail = event => this.setState({ email: event.target.value });

  keepPassword = event => this.setState({ password: event.target.value });

  handleSubmit = event => {
    event.preventDefault();

    const {
      state: { email, password }
    } = this;

    logic
      .authenticate(email, password)
      .then(token => {
        this.props.handleLogin(email, token, this.state.title);
      })
      .catch(({ message }) => {
        UserError(message);
      });
  };

  render() {
    return (
      <div className="mt-5" id="RecipeLogin">
        <Form id="LoginForm" onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label className="titleLogin">Login</Label>
            <Input
              className="emailInput"
              type="text"
              onChange={this.keepEmail}
              name="Email"
              placeholder="Email"
              required
              autoFocus="true"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              onChange={this.keepPassword}
              name="password"
              placeholder="Password"
              required
            />
            <Button className="submitButton" id="submitButton">
              Login
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
