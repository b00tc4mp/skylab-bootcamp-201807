import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
// import logic from '../logic'

class Register extends Component {

    state = {
        username: '',
        email: '',
        password: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {username, email, password} = this.state
        
    }

    render() {
        return(
        <div>
           <h1>REGISTER</h1>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input id='username' name='username' type='text' placeholder='Username' /><br/>

                <label htmlFor='email'>Email:</label>
                <input id='email' name='email' type='text' placeholder='Email'/><br/>

                <label htmlFor='password'>Password:</label>
                <input id='password' name='password' type='password' placeholder='Password'/><br/>

                 <button type='submit'>Register</button>
            </form>
        </div>
        );
    }
}



export default withRouter (Register)