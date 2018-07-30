import React, {Component} from 'react'

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

    render() {

        return ( <form onSubmit = {this.login}> 
            <input type = "text" placeholder = "Enter username" onChange = {this.saveUsername}>
            </input>
            <input type = "password" placeholder = "Enter password" onChange = {this.savePassword}>
            </input>
        <button type="submit">Login
        </button>
    </form>
    )
    }
}
    

export default Login