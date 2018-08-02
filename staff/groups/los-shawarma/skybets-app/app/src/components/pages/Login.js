import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {

    state = {
        username: null,
        password: null
    }

    keepUsername = e => this.setState({username: e.target.value})

    keepPassword = e => this.setState({password: e.target.value})

    submitLogin = e => {
        e.preventDefault()

        const { username, password } = this.state
        this.props.onLoginProp(username, password)
    }
    

    render() {

        const { submitLogin, keepUsername, keepPassword } = this

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={submitLogin}>
                    <input type="text" className="form-control" placeholder="Enter username" onChange={keepUsername}/>
                    <input type="password" className="form-control" placeholder="Enter Password" onChange={keepPassword}/>
                    <button type="submit" className="btn btn-primary">Log In</button>
                </form>
                <Link to="/register">Register</Link>
                <Link to="/">Home</Link>
            </div>
        )
    }
}

export default Login;




