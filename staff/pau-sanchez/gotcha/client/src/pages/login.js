import React, {Component} from 'react'
import {logic} from '../logic'
import { withRouter } from 'react-router-dom'
import Navbars from '../components/Navbars'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Loader from 'react-loader-spinner'

class Login extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        loading: false
    }
    
    onEmailChange = e => this.setState({ email: e.target.value })
    onPasswordChange = e => this.setState({ password: e.target.value })
    
    onLoginSubmit = e => {
        e.preventDefault()

        const {email, password} = this.state
        this.setState({loading: true})
        logic.authenticate(email, password)
            .then(res => this.props.onLoggedIn(res.id, res.token))
            .catch(({ message }) => this.setState({ error: message }))
            
    }
    
    render() {

        const { error, loading } = this.state

        return <div>
                
                <Navbars />

                {
                (loading && !error)
                ?<div className='loadinglogin_group'>
                    <Loader type="Puff" color="#00BFFF" height="100" width="100"/> 
                </div>
                :<Form onSubmit={this.onLoginSubmit} className='signuplogin_group'>
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
                }
                
            </div>
        
    }
}

export default withRouter(Login)