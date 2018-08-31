import React, { Component } from 'react';
import './styles/Login.css'
class Login extends Component {

    state = {
        username: '',
        password: '',
        msg: ''
    }

    keepUsername = e => this.setState({ username: e.target.value })
    keepPassword = e => this.setState({ password: e.target.value })
    login = () =>
        this.props.login(this.state.username, this.state.password)
            .catch(err => this.setState({ msg: err.message }))
    register = () => this.props.register()

    render() {
        const { msg } = this.state
        const { keepPassword, keepUsername, login, register } = this
        return (
            <div className='login'>
                <h3> Login </h3>
                <input onChange={keepUsername} type='text' placeholder='username' />
                <input onChange={keepPassword} type='password' placeholder='password' />
                <div>
                    {msg && <p>{msg}</p>}
                </div>
                <button onClick={login}>log in</button>
                <button onClick={register}>register</button>
            </div>
        )
    }
}

export default Login