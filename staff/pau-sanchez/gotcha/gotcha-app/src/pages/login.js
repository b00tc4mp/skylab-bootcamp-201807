import React, {Component} from 'react'
import {logic} from '../logic'
import { withRouter } from 'react-router-dom'
import Navbars from '../components/Navbar'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends Component {

    state = {
        email: '',
        password: '',
        error: ''
    }
    
    

    onEmailChange = e => this.setState({ email: e.target.value })
    onPasswordChange = e => this.setState({ password: e.target.value })
    
    onLoginSubmit = e => {
        e.preventDefault()

        const {email, password} = this.state
        
        logic.authenticate(email, password)
            
            .then(res => this.props.onLoggedIn(res.id, res.token))
            .catch(({ message }) => this.setState({ error: message }))
            window.location.reload()
    }
    
    render() {

        const { error } = this.state

        return <div>
                
                <Navbars />
                
                <Form onSubmit={this.onLoginSubmit} className='signuplogin_group'>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input type="email" name="email" placeholder="email" 
                        autofocus 
                        onChange={this.onEmailChange} 
                        required/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input type="password" name="password" placeholder="password" 
                        onChange={this.onPasswordChange} 
                        required/>
                    </FormGroup>
                    <Button>Login</Button>
                {error && <p>{error}</p>}
                </Form>
            </div>
        
    }
}

export default withRouter(Login)