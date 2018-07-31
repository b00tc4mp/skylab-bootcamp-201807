import React, {Component} from 'react'
import Feedback from './Feedback'

class Signup extends Component{

    state = {
        username: null,
        password: null
    }

    saveUsername = (event) => {
        this.setState ({username: event.target.value})    
    }

    savePassword = (event) => {
        this.setState ({password: event.target.value})    
    }

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

        return ( 
        <section>
            {this.props.feedback && <Feedback message = {this.props.feedback}/>} 
            <form onSubmit = {this.signup}> 
                <input type = "text" placeholder = "Enter username" onChange = {this.saveUsername}>
                </input>
                <input type = "password" placeholder = "Enter password" onChange = {this.savePassword}>
                </input>
                <button type="submit">Sign up
                </button>
            </form>
                 <p>Go to <a href="/#" onClick={this.linkToLogin}>Login</a></p>
        </section> 
    )
    }
}
    

export default Signup