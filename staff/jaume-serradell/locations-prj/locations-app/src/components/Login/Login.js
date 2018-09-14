import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'
import swal from 'sweetalert';
import './Login.css'


class Login extends Component {

    state = {
        email: '',
        password: '',
    }

    onLoginSubmitted = e => {
        e.preventDefault()
        const { email, password } = this.state
        logic.authenticate(email, password)
            .then( res => {
                swal({
                    title: "Owner logged correctly",
                    icon: "success"
                })
                .then(() => this.props.onLoggedIn(this.state.email,res.token,res.id))
            })
            .catch(({ message }) =>
                swal({
                    title: message,
                    icon: "error",
                })
            )
    }

    onEmailChanged = e => this.setState({ email: e.target.value })

    onPasswordChanged = e => this.setState({ password: e.target.value })

    render() {
        return <div className="container">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 borderBox">
                    <h4>Login</h4>
                    <form onSubmit={this.onLoginSubmitted}>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" onChange={this.onEmailChanged} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password" onChange={this.onPasswordChanged} />
                            <small className="form-text text-muted">The password must be more than 6 characters</small>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div className="col-3"></div>
            </div>
      </div>
    }
}

export default withRouter(Login)
