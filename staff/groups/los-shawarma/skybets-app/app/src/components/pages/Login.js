import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {

    state = {
        username: null,
        password: null
    }

    render() {
        return (
            <section>
                <h1>Login</h1>
                <form onSubmit={this.onLogin}>
                    <input type="text" onChange={this.keepUsername}/>
                    <input type="password"onChange={this.keepPassword}/>
                    <button type="submit">Log In</button>
                </form>
                <Link to="/register">Register</Link>
                <Link to="/">Home</Link>
            </section>
        )
    }
}

export default Login;

