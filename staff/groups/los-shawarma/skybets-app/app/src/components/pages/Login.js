import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends Component {
/*
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

*/

/*
<div id="myModal" className="modal fade">
                <div className="modal-dialog modal-login">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="avatar">
                                <img src="/examples/images/avatar.png" alt="Avatar" />
                            </div>				
                            <h4 className="modal-title">Member Login</h4>	
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div className="modal-body">
                            <form action="/examples/actions/confirmation.php" method="post" onSubmit={submitLogin}>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="username" placeholder="Username" required="required" onChange={keepUsername} />		
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" name="password" placeholder="Password" required="required" onChange={keepPassword} />	
                                </div>        
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-lg btn-block login-btn">Login</button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <a href="#">Forgot Password?</a>
                        </div>
                    </div>
                </div>
            </div> 
*/


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
                <img className="mb-4" src="../../assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" / >
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus="" onChange={keepUsername}/>
                <label className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" onChange={keepPassword}/>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>
        )
    }
}

export default Login;







