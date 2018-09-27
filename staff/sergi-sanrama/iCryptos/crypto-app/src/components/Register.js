import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import logic from '../logic/logic'
import './styles/Register.css'

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
            .catch(({ message }) => alert(message))
            
    }

    render() {
        return <div>
            <div className='register_form'>
            <h2>REGISTER</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <input onChange={this.handleChange} name='username' type='text' placeholder='username' />

                    <label>Email</label>
                    <input onChange={this.handleChange} name='email' type='text' placeholder='email'/>

                    <label>Password</label>
                    <input onChange={this.handleChange} name='password' type='password' placeholder='password'/>

                    <button className='button_form' type='submit'>Register</button>
                    <br/>
            <div className='button_return btn'><a href='/#/user/authenticate'> Login</a></div>
                </form>
            </div>
        </div>
        
    }
}



export default withRouter (Register)