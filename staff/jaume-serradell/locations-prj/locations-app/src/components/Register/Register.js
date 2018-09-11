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
        return <div class="container">
            <div class="row">
                <div class="col-3"></div>
                <div class="col-6 borderBox">
                    <h4>Register</h4>
                    <form onSubmit={this.onRegisterSubmitted}>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Name</label>
                            <input type="name" class="form-control" placeholder="Enter name" onChange={this.onNameChanged} />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" placeholder="Enter email" onChange={this.onEmailChanged} />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
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

export default withRouter(Register)





