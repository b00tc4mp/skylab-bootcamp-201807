import React, { Component } from "react";
import "./Register.css";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  CustomInput
} from "reactstrap";
import { withRouter } from "react-router-dom";
import { logic } from "../../logic";
import UserSuccesful from "../SuccedPanel/UserSuccesful";
import UserError from "../ErrorPanel/UserError";

class Register extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    allergens: {
      "alcohol-free": false,
      "celery-free": false,
      "crustacean-free": false,
      "dairy-free": false,
      "egg-free": false,
      "fish-free": false,
      "gluten-free": false,
      "mustard-free": false,
      "No-oil-added": false,
      "low-sugar": false,
      "peanut-free": false,
      "pork-free": false,
      "red-meat-free": false,
      "sesame-free": false,
      "shellfish-free": false,
      "soy-free": false
    },
    title: "Register"
  };

  keepEmail = event => this.setState({ email: event.target.value });

  keepUsername = event => this.setState({ username: event.target.value });

  keepPassword = event => this.setState({ password: event.target.value });

  keepAllergens = event => {
    const name = event.target.name;
    const value = event.target.checked;

    const prevAllergens = this.state.allergens;

    this.setState({
      allergens: { ...prevAllergens, [name]: value }
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const {
      state: { email, username, password, allergens }
    } = this;

    const arrAllergens = [];

    for (let allergen in allergens) {
      allergens[allergen] && arrAllergens.push(allergen);
    }

    logic
      .register(email, username, password, arrAllergens)
      .then(() => {
        UserSuccesful(this.state.title).then(() => {
          this.props.history.push("/login");
        });
      })
      .catch(({ message }) => {
        UserError(message);
      });
  };

  render() {
    return (
      <div className="mt-4">
        <Form id="registerForm" onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label className="titleRegister">Register</Label>
            <Input
              className="emailInput"
              type="email"
              value={this.state.email}
              onChange={this.keepEmail}
              name="Email"
              placeholder="Email"
              required
              autoFocus="true"
            />
            <FormText color="muted">Email is required</FormText>
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              value={this.state.username}
              onChange={this.keepUsername}
              name="username"
              placeholder="Username"
            />
            <FormText color="muted">Username is required</FormText>
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.keepPassword}
              placeholder="Password"
              required
            />
            <FormText color="muted">Min 6 characters</FormText>
          </FormGroup>
          <FormGroup>
            <Label className="allergenTitle">Your Allergens</Label>

            <div className="allergens">
              <div>
                <CustomInput
                  type="checkbox"
                  value="alcohol-free"
                  onChange={this.keepAllergens}
                  checked={this.state.allergens["alcohol-free"]}
                  name="alcohol-free"
                  id="exampleCustomInline"
                  label="Alcohol-free"
                  inline
                />
                <CustomInput
                  type="checkbox"
                  value="celery-free"
                  onChange={this.keepAllergens}
                  checked={this.state.allergens["celery-free"]}
                  name="celery-free"
                  id="exampleCustomInline2"
                  label="Celery-free"
                  inline
                />
                <CustomInput
                  type="checkbox"
                  value="crustacean-free"
                  onChange={this.keepAllergens}
                  checked={this.state.allergens["crustacean-free"]}
                  name="crustacean-free"
                  id="exampleCustomInline3"
                  label="Crustacean-free"
                  inline
                />
                <CustomInput
                  type="checkbox"
                  value="dairy-free"
                  onChange={this.keepAllergens}
                  checked={this.state.allergens["dairy-free"]}
                  name="dairy-free"
                  id="exampleCustomInline4"
                  label="Dairy-free"
                  inline
                />
              </div>
              <div>
                <CustomInput
                  type="checkbox"
                  value="egg-free"
                  onChange={this.keepAllergens}
                  checked={this.state.allergens["egg-free"]}
                  name="egg-free"
                  id="exampleCustomInline5"
                  label="Egg-free"
                  inline
                />
                <CustomInput
                  type="checkbox"
                  value="fish-free"
                  onChange={this.keepAllergens}
                  checked={this.state.allergens["fish-free"]}
                  name="fish-free"
                  id="exampleCustomInline6"
                  label="Fish-free"
                  inline
                />
                <CustomInput
                  type="checkbox"
                  value="gluten-free"
                  onChange={this.keepAllergens}
                  checked={this.state.allergens["gluten-free"]}
                  name="gluten-free"
                  id="exampleCustomInline7"
                  label="Gluten-free"
                  inline
                />
                <CustomInput
                  type="checkbox"
                  value="mustard-free"
                  onChange={this.keepAllergens}
                  checked={this.state.allergens["mustard-free"]}
                  name="mustard-free"
                  id="exampleCustomInline8"
                  label="Mustard-free"
                  inline
                />
              </div>
              <div>
                <CustomInput
                  type="checkbox"
                  value="No-oil-added"
                  onChange={this.keepAllergens}
                  checked={this.state.allergens["No-oil-added"]}
                  name="No-oil-added"
                  id="exampleCustomInline9"
                  label="No oil added"
                  inline
                />
                <CustomInput
                  type="checkbox"
                  value="low-sugar"
                  onChange={this.keepAllergens}
                  checked={this.state.allergens["low-sugar"]}
                  name="low-sugar"
                  id="exampleCustomInline10"
                  label="No-sugar"
                  inline
                />
                <CustomInput
                  type="checkbox"
                  value="peanut-free"
                  onChange={this.keepAllergens}
                  checked={this.state.allergens["peanut-free"]}
                  name="peanut-free"
                  id="exampleCustomInline11"
                  label="Peanuts-free"
                  inline
                />
                <CustomInput
                  type="checkbox"
                  value="pork-free"
                  onChange={this.keepAllergens}
                  checked={this.state.allergens["pork-free"]}
                  name="pork-free"
                  id="exampleCustomInline12"
                  label="Pork-free"
                  inline
                />
              </div>
              <div>
                <CustomInput
                  type="checkbox"
                  value="red-meat-free"
                  onChange={this.keepAllergens}
                  checked={this.state.allergens["red-meat-free"]}
                  name="red-meat-free"
                  id="exampleCustomInline13"
                  label="Red meat-free"
                  inline
                />
                <CustomInput
                  type="checkbox"
                  value="sesame-free"
                  onChange={this.keepAllergens}
                  checked={this.state.allergens["sesame-free"]}
                  name="sesame-free"
                  id="exampleCustomInline14"
                  label="Sesame-free"
                  inline
                />
                <CustomInput
                  type="checkbox"
                  value="shellfish-free"
                  onChange={this.keepAllergens}
                  checked={this.state.allergens["shellfish-free"]}
                  name="shellfish-free"
                  id="exampleCustomInline15"
                  label="Shellfish-free"
                  inline
                />
                <CustomInput
                  type="checkbox"
                  value="soy-free"
                  onChange={this.keepAllergens}
                  checked={this.state.allergens["soy-free"]}
                  name="soy-free"
                  id="exampleCustomInline16"
                  label="Soy-free"
                  inline
                />
              </div>
            </div>
            <Button type="submit" id="submitButton">
              Submit
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default withRouter(Register);
