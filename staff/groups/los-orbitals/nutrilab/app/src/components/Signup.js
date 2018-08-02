import React, {Component} from 'react'
import Feedback from './Feedback'

class Signup extends Component{

    state = {
        username: null,
        password: null,
    }

    saveUsername = (event) => this.checkUsername(event.target.value) 

    savePassword = (event) => this.checkPassword(event.target.value) 

    checkUsername = value => {
        const regex = (/^[a-zA-Z0-9]+$/)
        let regexOk = value.match(regex)

        if (regexOk !== null ) this.setState({username: value})
    }

    checkPassword = value => {
        const regex = (/^[a-zA-Z0-9]+$/)
        let regexOk = value.match(regex)

        if (regexOk !== null ) this.setState({password: value})    
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

        const {signup, saveUsername, savePassword, linkToLogin} = this
        return ( 
            <section>
                {this.props.feedback && <Feedback message={this.props.feedback}/>} 
                <form onSubmit={signup}> 
                    <input type="text" placeholder="username" onChange={saveUsername}></input>
                    <input type="password" placeholder="password" onChange={savePassword}></input>
                    <button type="submit">Signup</button>
                </form>
                <p>Go to <a href="/#" onClick={linkToLogin}>Login</a></p>
            </section> 
        )
    }
}

export default Signup