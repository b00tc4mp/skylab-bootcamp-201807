import React, {Component} from 'react';
import './Register.css';
import {Button, Form, FormGroup, Label, Input, FormText, Col, CustomInput} from 'reactstrap';
import {withRouter} from 'react-router-dom'



class UserRegister extends Component {


  render() {
    return (

      <div className="mt-4" >
        <Form id="registerForm">
          <FormGroup>
            <Label for="Usermail">Email</Label>
            <Input type="email" name="Usermail" placeholder="Email" required
                   autoFocus="true"/>
            <FormText color="muted">
              Email is required
            </FormText>
          </FormGroup>
          <FormGroup>
            <Label for="Username">Username</Label>
            <Input type="text" name="Username" 
                   placeholder="Username" required/>
            <FormText color="muted">
              Username is required
            </FormText>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password" name="password"
              placeholder="Password" required/>
            <FormText color="muted">
              Must contain at least one number and one uppercase and lowercase letter, and at least 6 to 15 characters
            </FormText>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Confirm Password</Label>
            <Input
              type="password" name="password" 
              placeholder="Confirm Password" required/>
            <FormText color="muted">
              Must contain at least one number and one uppercase and lowercase letter, and at least 6 to 15 characters
            </FormText>
          </FormGroup>
          <FormGroup>
          <Label for="exampleCheckbox">Your Allergens</Label>
          <div>
            <CustomInput type="checkbox" id="exampleCustomInline" label="Alcohol-free" inline />
            <CustomInput type="checkbox" id="exampleCustomInline2" label="Celery-free" inline />
            <CustomInput type="checkbox" id="exampleCustomInline3" label="Crustacean-free" inline />
            <CustomInput type="checkbox" id="exampleCustomInline4" label="Dairy-free" inline />
          </div>
          <div>
            <CustomInput type="checkbox" id="exampleCustomInline5" label="Egg-free" inline />
            <CustomInput type="checkbox" id="exampleCustomInline6" label="Fish-free" inline />
            <CustomInput type="checkbox" id="exampleCustomInline7" label="Gluten-free" inline />
            <CustomInput type="checkbox" id="exampleCustomInline8" label="Mustard-free" inline />
          </div>
          <div>
            <CustomInput type="checkbox" id="exampleCustomInline9" label="No oil added" inline />
            <CustomInput type="checkbox" id="exampleCustomInline10" label="No-sugar" inline />
            <CustomInput type="checkbox" id="exampleCustomInline11" label="Peanuts-free" inline />
            <CustomInput type="checkbox" id="exampleCustomInline12" label="Pork-free" inline />
          </div>
          <div>
            <CustomInput type="checkbox" id="exampleCustomInline13" label="Red meat-free" inline />
            <CustomInput type="checkbox" id="exampleCustomInline14" label="Sesame-free" inline />
            <CustomInput type="checkbox" id="exampleCustomInline15" label="Shellfish-free" inline />
            <CustomInput type="checkbox" id="exampleCustomInline16" label="Soy-free" inline />
          </div>
        </FormGroup>
          <Button className="submitButton">Submit</Button>
        </Form>
      </div>
    );
  }
}


export default withRouter(UserRegister)


