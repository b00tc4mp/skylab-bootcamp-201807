import React, {Component} from 'react'

import './Login.css'

class Login extends Component {
    state = {
        username: null,
        password: null
    }

    keepPassword = event => this.setState({password: event.target.value})
    keepUsername = event => this.setState({username: event.target.value})
    loginUser = () => {
        const {state: {username, password}} = this
        this.props.onLogin(username, password)
    }
    render() {
        const {
            props: {
                fail,
                onRegister
            },
            keepPassword,
            keepUsername,
            loginUser
        } = this
        return(
            <div className="login">
                <h1 className="login__title"> Log in </h1>
                <div className="login__group">
                    <h3 className="login__text"> Username </h3>
                    <input className="login__input" onChange={keepUsername}></input>
                </div>
                <div className="login__group">
                    <h3 className="login__text"> Password </h3>
                    <input className="login__input" onChange={keepPassword}></input>
                </div>
                <div>
                    {fail && <p className="login__error">{fail}</p>}
                </div>
                <button className="login__btn" onClick={loginUser}> Log in </button>
                <button className="login__btn login__btn--secondary" onClick={onRegister}> Register </button>
            </div>
        )
    }
}

export default Login