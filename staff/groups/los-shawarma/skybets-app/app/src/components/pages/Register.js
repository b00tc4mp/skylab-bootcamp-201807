import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class Register extends Component {
    state = {
        username: null,
        password: null
    }

    keepUsername = e => this.setState({username: e.target.value})

    keepPassword = e => this.setState({password: e.target.value})

    submitRegistration = e => {
        e.preventDefault()

        const {username, password} = this.state
        this.props.onRegisterProp(username, password)
    }

    render () {
        const {submitRegistration, keepUsername, keepPassword} = this
        return (
            <section>
                <h1> Register </h1>
                <form onSubmit={submitRegistration}>
                    <label>Username</label>
                    <input type="text" placeholder="type username" onChange={keepUsername}/>
                    <label>Password</label>
                    <input type="password" placeholder="type password" onChange={keepPassword}/>
                    <button type="submit" >Register</button>
                </form>
                <Link to="/login">Login</Link>
                <Link to="/">Home</Link> 
            </section>
        )
    }
    
}

export default Register;