import React, {Component} from 'react'
import Feedback from './Feedback'

class Signup extends Component{

    state = {
        username: null,
        password: null
    }

    saveUsername = (event) => this.setState ({username: event.target.value}) 

    savePassword = (event) => this.setState ({password: event.target.value}) 

    signup = (event) => {
        event.preventDefault()
        const {username, password} = this.state
        this.props.onSignUp(username, password)
    }

    linkToLogin = (event) => {
        event.preventDefault()
        this.props.linkToLogin()
    }

    render() {

        const {signup, saveUsername, savePassword, linkToLogin} = this
        return ( 
            <section>
                {this.props.feedback && <Feedback message={this.props.feedback}/>} 
                <form onSubmit={signup}> 
                    <input type="text" placeholder="Enter username" onChange={saveUsername}></input>
                    <input type="password" placeholder="Enter password" onChange={savePassword}></input>
                    <button type="submit">Sign up</button>
                </form>
                <p>Go to <a href="/#" onClick={linkToLogin}>Login</a></p>
            </section> 
        )
    }
}

export default Signup