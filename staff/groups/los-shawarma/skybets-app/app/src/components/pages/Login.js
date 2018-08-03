import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

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
            <form className="form-signin" onSubmit={submitLogin}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label className="sr-only">Username</label>
                <input type="text" id="inputEmail" className="form-control" placeholder="Username" required="" autoFocus="" onChange={keepUsername}/>
                <label className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" onChange={keepPassword}/>
                <button className="btn btn-lg btn-block" type="submit">Sign in</button>
            </form>
        )
    }
}

export default Login







