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
                .then(() => this.props.onLoggedIn(this.state.email,res.token))
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
        return <div class="container">
            <div class="row">
                <div class="col-3"></div>
                <div class="col-6 borderBox">
                    <h4>Login</h4>
                    <form onSubmit={this.onLoginSubmitted}>
                        <div class="form-group">
                            <label>Email address</label>
                            <input type="email" class="form-control" placeholder="Enter email" onChange={this.onEmailChanged} />
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control" placeholder="Password" onChange={this.onPasswordChanged} />
                            <small class="form-text text-muted">The password must be more than 6 characters</small>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div class="col-3"></div>
            </div>
      </div>
    }
}

export default withRouter(Login)
