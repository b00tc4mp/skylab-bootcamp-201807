import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import logic from '../logic/logic'

class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {email,password} = this.state
        logic.authenticate(email, password)
            .then((token) => {
                this.props.handleLogin(email, token)
            })
    }

    render() {

        return <div>
            <h1>LOGIN</h1>
            <form onSubmit={this.handleSubmit}>
                <label>Email:</label>
                <input onChange={this.handleChange} name='email' type='text' placeholder='Email'/>

                <label>Password:</label>
                <input onChange={this.handleChange} name='password' type='password' placeholder='Password'/>

                <button type="submit">Login</button>
                <br/>
                <a href='/#/user/register'>return to Register</a>
            </form>
        </div>

    }


}

export default withRouter(Login)