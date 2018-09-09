import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { logic } from '../logic'
import swal from 'sweetalert2'

class Register extends Component {

    state = {
        email: "",
        name: "",
        address: "",
        phone: "",
        latitude: "",
        longitude: "",
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
        let { email, name, address, phone, password, latitude, longitude } = this.state

        latitude = parseFloat(latitude)
        longitude = parseFloat(longitude)

        logic.register(email, name, address, phone, password, latitude, longitude)
            .then(() => {
                swal({
                    type: 'success',
                    title: 'Registered Successfully',
                    showConfirmButton: false,
                    timer: 1000
                })
                return this.props.history.push('/login')
            })
            .catch(message => {
                swal({
                    type: 'error',
                    title: `${message}`,
                    showConfirmButton: false,
                    timer: 1000
                })
            })
    }


    render() {
        return <div>
            <nav class="navbar is-primary nav">
                <a class="navbar-item" href="/"><button class="button is-success">Home</button></a>
                <a class="navbar-item" href="/#/login"><button class="button is-success">Login</button></a>
            </nav>
            <div class="container-form">
                <h1>Register</h1>
                < form onSubmit={this.handleSubmit} >
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <input class="input" type="email" placeholder="Email" onChange={this.handleChange} name="email" />
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                            </span>
                            <span class="icon is-small is-right">
                                <i class="fas fa-check"></i>
                            </span>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <input class="input" type="text" placeholder="Name" onChange={this.handleChange} name="name" />
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <input class="input" type="text" placeholder="Address" onChange={this.handleChange} name="address" />
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <input class="input" type="text" placeholder="Phone" onChange={this.handleChange} name="phone" />
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <input class="input" type="number" placeholder="Optional latitude..." step="any" onChange={this.handleChange} name="latitude" />
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <input class="input" type="number" placeholder="Optional longitude..." step="any" onChange={this.handleChange} name="longitude" />
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left">
                            <input class="input" name="password" type="password" onChange={this.handleChange} placeholder="Password" />
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <button class="button is-success" type="submit">Register</button>
                </form >
            </div>
        </div>
    }
}

export default withRouter(Register)