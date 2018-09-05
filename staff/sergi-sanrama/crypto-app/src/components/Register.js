import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import logic from '../logic/logic'

class Register extends Component {

    state = {
        username: '',
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
        const {username, email, password} = this.state
         logic.register(username, email, password)
            .then(() => this.props.history.push('/user/authenticate'))
            .catch(({message}) => console.log(message))
    }

    render() {
        return(
        <div>
           <h1>REGISTER</h1>
            <form onSubmit={this.handleSubmit}>
                <label>Username:</label>
                <input onChange={this.handleChange} name='username' type='text' placeholder='username' />

                <label>Email:</label>
                <input onChange={this.handleChange} name='email' type='text' placeholder='email'/>

                <label>Password:</label>
                <input onChange={this.handleChange} name='password' type='password' placeholder='password'/>

                <button type='submit'>Register</button>
                <br/>
                <a href='/#/user/authenticate'>return to Login</a>
            </form>
        </div>
        )
    }
}



export default withRouter (Register)