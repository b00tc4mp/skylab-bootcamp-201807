import React, { Component } from 'react'
import './Register.css'

class Register extends Component {

    state = {
        username: null,
        password: null
    }

    keepUsername = event => this.setState({username: event.target.value})
    keepPassword = event => this.setState({password: event.target.value})
    handleSubmit = event => {
        event.preventDefault()
        this.props.onRegister(this.state.username, this.state.password);
    }

    render() {
        if(this.props.fail)
            return (
                <div>
                    <h1> Registration Failed ! </h1>
                    <h2> Try again </h2>
                </div>
            )
        else
            return (
                <div>
                    <form className="signup-form">
                        <input className="signup-form__input" placeholder="username" onChange={this.keepUsername}></input>
                        <input className="signup-form__input" placeholder="password" onChange={this.keepPassword}></input>
                        <button className="signup-form__button" type="submit" onClick={this.handleSubmit}>Sign Up</button>
                    </form>
                </div>
            )
    }
}

export default Register