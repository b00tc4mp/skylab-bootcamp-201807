import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import logic from '../logic/logic'
import './styles/Login.css'
import swal from 'sweetalert';


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
            .catch(({ message }) => swal(`Login failed; Invalid email: ${message} or password`))
    }

    render() {

        return <div>
            <article id="info">
                <div className='login_form'>
                    <h2>LOGIN</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label>Email</label>
                        <input onChange={this.handleChange} name='email' type='text' placeholder='Email'/>

                        <label>Password</label>
                        <input onChange={this.handleChange} name='password' type='password' placeholder='Password'/>
                        
                        <button className='button_form' type="submit">LOGIN</button>
                        <br/>
                        <div className='button_return'><a href='/#/user/register'>Register</a></div>
                    </form>
               </div>
            </article>
        </div>

    
    }


}

export default withRouter(Login)