import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { logic } from '../../logic'
import swal from 'sweetalert2'
import Geolocation from 'react-geolocation'
import './register.css'

class Register extends Component {

    state = {
        email: "",
        name: "",
        address: "",
        phone: "",
        lat: "",
        long: "",
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
        let { email, name, address, phone, password, lat, long } = this.state
        lat = parseFloat(lat)
        long = parseFloat(long)

        logic.register(email, name, address, phone, password, this.confirmLatitude(), this.confirmLongitude())
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

    confirmLatitude = (latitude) => {
        this.setState({
            lat: latitude
        })

        return this.state.lat;
    }

    confirmLongitude = (longitude) => {
        this.setState({
            long: longitude
        })
        return this.state.long;
    }

    render() {
        return <div>
            <nav class="navbar is-primary nav">
                <Link to={'/'} class="navbar-item"><button class="button is-success">Home</button></Link>
                <Link to={'/login'} class="navbar-item"><button class="button is-success">Login</button></Link>
            </nav>
            <div class="container-form">
                <h1 className="title">Register</h1>
                <form onSubmit={this.handleSubmit} >
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
                        <p class="control has-icons-left">
                            <input class="input" name="password" type="password" onChange={this.handleChange} placeholder="Password" />
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <Geolocation
                        render={({ getCurrentPosition, position: { coords: { latitude, longitude } = {} } = {}, }) => (
                            <div>
                                <div className="container-location">
                                    <input class="input location" type="number" placeholder="Latitude" step="any" value={latitude} onChange={this.handleChange} name="lat" />
                                    <input class="input location" type="number" placeholder="Longitude" step="any" value={longitude} onChange={this.handleChange} name="long" />
                                    {this.state.lat && <button class="button no-coordinates" onClick={(e) => {
                                        e.preventDefault(),
                                            this.confirmLatitude(latitude)
                                        this.confirmLongitude(longitude)
                                    }}>Ok</button>}
                                    {!this.state.lat && <button class="button coordinates" onClick={(e) => {
                                        e.preventDefault(),
                                            this.confirmLatitude(latitude)
                                        this.confirmLongitude(longitude)
                                    }}>Ok</button>}
                                    
                                </div>
                            </div>
                        )}
                    />
                    <p className="location-required">Location not required</p>
                    <button class="button is-success" type="submit">Register</button>
                </form >
            </div>
        </div>
    }
}
export default withRouter(Register)