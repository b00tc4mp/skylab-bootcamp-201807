import React, {Component} from 'react'
import Feedback from './Feedback'

class Login extends Component{

    state = {
        username: null,
        password: null
    }

    saveUsername = (event) => this.setState ({username: event.target.value})    

    savePassword = (event) => this.setState ({password: event.target.value}) 

    login = (event) => {
        event.preventDefault()
        const {username, password} = this.state
        this.props.onLogin(username, password)
    }

    linkToSignUp = (event) => {
        event.preventDefault()
        this.props.linkToSignUp()
    }

    render() {
        const {login, saveUsername, savePassword, linkToSignUp} = this
        return ( 
            <section>
                {this.props.feedback && <Feedback message={this.props.feedback} />} 
                <form onSubmit={login}> 
                    <input className="input--border" type="text" placeholder="username" onChange={saveUsername}></input>
                    <input className="input--border" type="password" placeholder="password" onChange={savePassword}></input>
                    <button type="submit">Login</button>
                </form>
                <p>Go to <a href="/#" onClick={linkToSignUp}>Signup</a></p> 
            </section>
        )
    }
}
    

export default Login