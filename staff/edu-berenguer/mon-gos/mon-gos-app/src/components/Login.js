import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { logic } from '../logic'

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
                message
            })
    }

    render() {
        return <div>
            <a href="/#/register"><button>Registro</button></a>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={this.onSubmit}>
                <input type="text" placeholder="Email" name="email" onChange={this.handleChange} />
                <input type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                <input type="submit" value="Entrar" />
            </form>

        </div>
    }
}

export default withRouter(Login)