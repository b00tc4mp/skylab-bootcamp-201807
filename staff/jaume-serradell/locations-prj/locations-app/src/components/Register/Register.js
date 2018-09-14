import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'
import swal from 'sweetalert';
import './Register.css'

class Register extends Component {

    state = {
        email: '',
        password: '',
    }

    onNameChanged = e => this.setState({ name: e.target.value })

    onEmailChanged = e => this.setState({ email: e.target.value })

    onPasswordChanged = e => this.setState({ password: e.target.value })

    onRegisterSubmitted = e => {
        e.preventDefault()
        const { name, email, password } = this.state
        logic.register(name, email, password)
            .then(() => this.props.history.push('/login'))
            .catch(({ message }) =>
                swal({
                    title: message,
                    icon: "error",
                })
            )
    }

    render() {
        return <div className="container">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 borderBox">
                    <h4>Register</h4>
                    <form onSubmit={this.onRegisterSubmitted}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Name</label>
                            <input type="name" className="form-control" placeholder="Enter name" onChange={this.onNameChanged} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" onChange={this.onEmailChanged} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
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

export default withRouter(Register)





