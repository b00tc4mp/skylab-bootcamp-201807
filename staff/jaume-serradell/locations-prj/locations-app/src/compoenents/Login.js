import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'

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
        const { email, password } = this.state
        logic.authenticate(email, password)
            .then((token) => {
                this.props.handleLogin(email, token)
            })

    }

    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <input name="email" class="input" type="email" onChange={this.handleChange} placeholder="Email" />
                <input name="password" class="input" type="password" onChange={this.handleChange} placeholder="Password" />
                <button type="submit">Submit</button>
            </form>
        </div>
    }
}

export default withRouter(Login)