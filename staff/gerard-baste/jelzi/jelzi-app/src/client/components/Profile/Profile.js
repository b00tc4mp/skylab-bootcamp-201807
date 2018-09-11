import React, {Component} from 'react';
import './Profile.css';
import {Button, Form, FormGroup, Label, Input, FormText, Col, CustomInput} from 'reactstrap';
import {withRouter} from 'react-router-dom'
import {logic} from '../../logic'
import UserSuccesful from '../SuccedPanel/UserSuccesful'
import UserError from '../ErrorPanel/UserError'



class Profile extends Component {

  
  state = {
    password: "",
    newUserAllergens: { 'alcohol-free': false, 'celery-free': false, 'crustacean-free': false, 'dairy-free': false, 
    'egg-free': false, 'fish-free': false, 'gluten-free': false, 'mustard-free': false, 'No-oil-added': false, 
    'low-sugar': false, 'peanut-free': false, 'pork-free': false, 'red-meat-free': false, 'sesame-free': false,
    'shellfish-free': false, 'soy-free': false},
    title:'Allergens Update'
  }
 oldAllergens = []


  componentDidMount() {
    const email = sessionStorage.getItem('email')
    const token = sessionStorage.getItem('token')
    logic.retrieveProfileUser(email, token)
    .then((userAllergens) => {
    this.oldAllergens = [...userAllergens]
        let newAllergens = {}
        userAllergens.map(allergen => {
          newAllergens[allergen] = true
        })
        
        const prevAllergens = this.state.newUserAllergens
        this.setState({
          newUserAllergens: {...prevAllergens, ...newAllergens}
        })
    })
  }


  keepPassword = event => this.setState({password: event.target.value})

  keepAllergens = event => {
    const name = event.target.name
    const value = event.target.checked
    
    const prevAllergens = this.state.newUserAllergens

    this.setState({
      newUserAllergens: { ...prevAllergens, [name]: value }
    })
  }

  handleSubmit = event => {
    
    event.preventDefault()
    const email = sessionStorage.getItem('email')
    const token = sessionStorage.getItem('token')

    const {state: {password, allergens, newUserAllergens}} = this

    const arrAllergens = []
    debugger
    for(let allergen in newUserAllergens) {
      newUserAllergens[allergen] && arrAllergens.push(allergen)
    }

    logic.updateAllergens(email, password, this.oldAllergens, arrAllergens, token)
      .then(() => {
        UserSuccesful(this.state.title).then(() => {
            this.props.history.push('/profile')
          })
      })
      .catch(({message}) => {
        UserError(message)

      })
  }


  render() {
    return (

      <div className="mt-4" >
        <Form id="registerForm" onSubmit={this.handleSubmit}>
          <FormGroup>
            <div>
          <Label className="titleProfile">Profile</Label>
          </div>
          <Label className="labelAllergens" for="exampleCheckbox">Your Allergens</Label>
          <div className="allergens">
          <div>
            <CustomInput type="checkbox" value="alcohol-free" onChange={this.keepAllergens} checked={this.state.newUserAllergens['alcohol-free']} name="alcohol-free" id="exampleCustomInline" label="Alcohol-free" inline />
            <CustomInput type="checkbox" value="celery-free"  onChange={this.keepAllergens} checked={this.state.newUserAllergens['celery-free']} name="celery-free" id="exampleCustomInline2" label="Celery-free" inline />     
            <CustomInput type="checkbox" value="crustacean-free" onChange={this.keepAllergens} checked={this.state.newUserAllergens['crustacean-free']} name="crustacean-free" id="exampleCustomInline3" label="Crustacean-free" inline />
            <CustomInput type="checkbox" value="dairy-free" onChange={this.keepAllergens} checked={this.state.newUserAllergens['dairy-free']} name="dairy-free" id="exampleCustomInline4" label="Dairy-free" inline />
          </div>
          <div>
            <CustomInput type="checkbox" value="egg-free" onChange={this.keepAllergens} checked={this.state.newUserAllergens['egg-free']} name="egg-free" id="exampleCustomInline5" label="Egg-free" inline />
            <CustomInput type="checkbox" value="fish-free" onChange={this.keepAllergens} checked={this.state.newUserAllergens['fish-free']} name="fish-free" id="exampleCustomInline6" label="Fish-free" inline />
            <CustomInput type="checkbox" value="gluten-free" onChange={this.keepAllergens} checked={this.state.newUserAllergens['gluten-free']} name="gluten-free" id="exampleCustomInline7" label="Gluten-free" inline />
            <CustomInput type="checkbox" value="mustard-free" onChange={this.keepAllergens} checked={this.state.newUserAllergens['mustard-free']} name="mustard-free" id="exampleCustomInline8" label="Mustard-free" inline />
          </div>
          <div>
            <CustomInput type="checkbox" value="No-oil-added" onChange={this.keepAllergens} checked={this.state.newUserAllergens['No-oil-added']} name="No-oil-added" id="exampleCustomInline9" label="No oil added" inline />
            <CustomInput type="checkbox" value="low-sugar" onChange={this.keepAllergens} checked={this.state.newUserAllergens['low-sugar']} name="low-sugar" id="exampleCustomInline10" label="No-sugar" inline />
            <CustomInput type="checkbox" value="peanut-free" onChange={this.keepAllergens} checked={this.state.newUserAllergens['peanut-free']} name="peanut-free" id="exampleCustomInline11" label="Peanuts-free" inline />
            <CustomInput type="checkbox" value="pork-free" onChange={this.keepAllergens} checked={this.state.newUserAllergens['pork-free']} name="pork-free" id="exampleCustomInline12" label="Pork-free" inline />
          </div>
          <div>
            <CustomInput type="checkbox" value="red-meat-free" onChange={this.keepAllergens} checked={this.state.newUserAllergens['red-meat-free']} name="red-meat-free" id="exampleCustomInline13" label="Red meat-free" inline />
            <CustomInput type="checkbox" value="sesame-free" onChange={this.keepAllergens} checked={this.state.newUserAllergens['sesame-free']} name="sesame-free" id="exampleCustomInline14" label="Sesame-free" inline />
            <CustomInput type="checkbox" value="shellfish-free" onChange={this.keepAllergens} checked={this.state.newUserAllergens['shellfish-free']} name="shellfish-free" id="exampleCustomInline15" label="Shellfish-free" inline />
            <CustomInput type="checkbox" value="soy-free" onChange={this.keepAllergens} checked={this.state.newUserAllergens['soy-free']} name="soy-free" id="exampleCustomInline16" label="Soy-free" inline />
          </div>
          </div>
        </FormGroup>
        <FormGroup>
            <Input
              className="passwordInput" type="password" name="password" value={this.state.password} onChange={this.keepPassword}
              placeholder="Password" required/>
            <FormText color="muted">
              You need the password to update your profile            </FormText>
            <Button type="submit" className="submitButton">Submit</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}


export default withRouter(Profile)
