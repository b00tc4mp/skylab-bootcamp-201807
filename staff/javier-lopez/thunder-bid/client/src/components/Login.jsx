import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import swal from 'sweetalert2'

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        const { email, password } = this.state
        logic.login(email, password)
            .then(res => {
                this.props.handleLogin(res.id, res.token)
            })
            .then(() => swal({
                title: "Login success!",
                text: 'You can make bids now.',
                type: "success",
                confirmButtonText: "Okay"
            }))
            .catch(({ message }) => swal({
                title: "Failed!",
                text: message,
                type: "error",
                confirmButtonText: "Try again"
            }))
    }

    render() {
        return <div className="container">
            <div className="row mt-5">
                <div className="col-3"></div>
                <div className="col">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="text" className="form-control" onChange={this.handleChange} name='email' placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name='password' onChange={this.handleChange} placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
                <div className="col-3"></div>
            </div>
        </div>
    }
}

export default withRouter(Login)