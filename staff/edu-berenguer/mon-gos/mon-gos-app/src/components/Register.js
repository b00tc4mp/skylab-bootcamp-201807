import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { logic } from '../logic'

class Register extends Component {

    state = {
        email: "",
        name: "",
        adress: "",
        phone: "",
        password: ""
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { email, name, adress, phone, password } = this.state
        logic.register(email, name, adress, phone, password)
            .then(() => this.props.history.push('/login'))
            .catch( message  => (
                console.log(message)
            ))
    }


    render() {
        return <div>
            <a href="/#/login"><button>Iniciar Sesión</button></a>
            <h1>Registro</h1>
            < form onSubmit={this.handleSubmit} >
                <input type="email" onChange={this.handleChange} name="email" placeholder="Email" />
                <input type="name" onChange={this.handleChange} name="name" placeholder="Nombre" />
                <input type="adress" onChange={this.handleChange} name="adress" placeholder="Dirección" />
                <input type="phone" onChange={this.handleChange} name="phone" placeholder="Teléfono" />
                <input type="password" name="password" onChange={this.handleChange} placeholder="Password" />
                <button type="submit">Registrar</button>
            </form >
            <a href="/"><button>Volver</button></a>
        </div>
    }
}

export default withRouter(Register)