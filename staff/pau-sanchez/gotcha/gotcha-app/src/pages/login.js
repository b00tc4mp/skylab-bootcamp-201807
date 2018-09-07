import React, {Component} from 'react'
import {logic} from '../logic'
import { withRouter } from 'react-router-dom'

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
                <h1>LOGIN</h1>
                <form onSubmit={this.onLoginSubmit}>
                    <input type="email" name="email" placeholder="email" autofocus onChange={this.onEmailChange} required/>
                    <input type="password" name="password" placeholder="password" onChange={this.onPasswordChange} required/>
                    <button>Login</button>
                </form>
                {error && <p>{error}</p>}
            </div>
        
    }
}

export default withRouter(Login)