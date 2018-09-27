import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import logic from '../logic'

class Login extends Component {

    state = {
        usermail: "",
        password: ""
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {usermail,password} = this.state
        logic.login(usermail,password)
            .then((token) => {
                this.props.handleLogin(usermail,token)
            })

    }

    render() {

        return <div>
            <h1>LOGIN</h1>
            <form onSubmit={this.handleSubmit}>
                <label>Email*</label>
                <input type="email" onChange={this.handleChange} name="usermail" placeholder="Email" />
                <label>Password*</label>
                <input type="password" name="password" onChange={this.handleChange} placeholder="Password" />

                <button type="submit">Submit</button>
            </form>
        </div>

    }

}

export default withRouter(Login)