import React, {Component} from 'react'
import Feedback from './Feedback'

class Login extends Component{

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
        return ( 
        <section>
            {this.props.feedback && <Feedback message = {this.props.feedback} />} 

            <form onSubmit = {this.login}> 
                <input type = "text" placeholder = "Enter username" onChange = {this.saveUsername}>
                </input>
                <input type = "password" placeholder = "Enter password" onChange = {this.savePassword}>
                </input>
                <button type="submit">Login
                </button>
             </form>
             <p>Go to <a href="/#" onClick= {this.linkToSignUp}>Sign up</a></p> 

        </section>

    )
    }
}
    

export default Login