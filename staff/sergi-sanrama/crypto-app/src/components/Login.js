import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

class Login extends Component {

    state = {
        email: '',
        password: ''
    }
    
    handleChange = (e) => {
        const { name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {email, password} = this.state
    }

    render() {

        return <div>
            <h1>LOGIN</h1>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='email'>Email:</label>
                <input onChange={this.handleChange} id='email' name='email' type='text' placeholder='Email'/><br/>

                <label htmlFor='password'>Password:</label>
                <input id='password' name='password' type='password' placeholder='Password'/><br/> 

                <button type="submit">Login</button>
            </form>
        </div>

    }


}

export default withRouter(Login)