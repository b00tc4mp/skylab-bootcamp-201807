import React, {Component} from 'react'

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

    render() {

        return ( <form onSubmit = {this.signup}> 
            <input type = "text" placeholder = "Enter username" onChange = {this.saveUsername}>
            </input>
            <input type = "password" placeholder = "Enter password" onChange = {this.savePassword}>
            </input>
        <button type="submit">Sign up
        </button>
    </form>
    )
    }
}
    

export default Signup