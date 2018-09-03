import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'

class Register extends Component {

    state = {
        email: '',
        password: '',
        name : ''
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {email, password, name} = this.state
        logic.register(email, password, name)
    }

    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <input name="name" class="input" type="text" onChange={this.handleChange} placeholder="Name" />
                <input name="email" class="input" type="email" onChange={this.handleChange} placeholder="Email" />
                <input name="password" class="input" type="password" onChange={this.handleChange} placeholder="Password" />
                <button type="submit">Submit</button>
            </form>
        </div>
    }

}

export default withRouter(Register)