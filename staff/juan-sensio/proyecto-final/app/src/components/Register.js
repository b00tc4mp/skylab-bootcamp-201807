import React, { Component } from 'react';

import './styles/Register.css'

class Register extends Component {

    state = {
        username: '',
        password: '',
        validation: '',
        msg: ''
    }

    keepUsername = e => this.setState({ username: e.target.value })
    keepPassword = e => this.setState({ password: e.target.value })
    keepValidation = e => this.setState({ validation: e.target.value })
    login = () => this.props.login()
    register = () => {
        const { username, password, validation } = this.state
        if (password === validation) {
            this.props.register(username, password)
                .then(() => this.login())
                .catch(err => this.setState({ msg: err.message }))
        } else
            this.setState({ msg: 'passwords must be equal' })
    }

    render() {
        const { msg } = this.state
        const { keepPassword, keepUsername, keepValidation, login, register } = this
        return (
            <div className='register'>
                <h3> Register </h3>
                <input onChange={keepUsername} type='text' placeholder='username' />
                <input onChange={keepPassword} type='password' placeholder='password' />
                <input onChange={keepValidation} type='password' placeholder='confirm password' />
                <div>
                    {msg && <p>{msg}</p>}
                </div>
                <button onClick={register}>register</button>
                <button onClick={login}>log in</button>
            </div>
        )
    }
}

export default Register