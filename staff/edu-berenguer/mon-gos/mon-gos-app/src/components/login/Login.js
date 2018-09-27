import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { logic } from '../../logic'
import swal from 'sweetalert2'
import 'bulma/css/bulma.css'

class Login extends Component {

    state = {
        email: "",
        password: ""
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { email, password } = this.state
        logic.authenticate(email, password)
            .then((res) => {
                this.props.handleLogin(res.id, res.token)
            })
            .catch(({ message }) => {
                swal({
                    type: 'error',
                    title: `${message}`,
                    showConfirmButton: true
                })
            })
    }
    render() {
        return <div>
            <nav class="navbar is-primary nav">
                <Link to='/' class="navbar-item" ><button class="button is-success">Home</button></Link>
                <Link to='/register' class="navbar-item"><button class="button is-success">Register</button></Link>
            </nav>
            <div class="container-form">
                <h1 className="title">Login</h1>
                <form onSubmit={this.onSubmit}>
                    <div class="field" >
                        <p class="control has-icons-left has-icons-right">
                            <input type="text" placeholder="Email" name="email" onChange={this.handleChange} class="input" />
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                            </span>
                            <span class="icon is-small is-right">
                                <i class="fas fa-check"></i>
                            </span>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left">
                            <input type="password" placeholder="Password" name="password" onChange={this.handleChange} class="input" />
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control">
                            <input class="button is-success" type="submit" value="Login" />
                        </p>
                    </div>

                </form>
            </div>
        </div>
    }
}

export default withRouter(Login)