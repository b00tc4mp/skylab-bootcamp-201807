import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import logic from '../logic'
import Swal from 'sweetalert2'

class Register extends Component{


    state = {
        usermail: "",
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
        const {usermail,password} = this.state
        logic.register(usermail,password)
            .then(() => this.props.history.push('/login'))
            .catch(({message}) => Swal(
                'Error',
                message,
                'error'
              ))
    }

    render() {

        return <div class="container">
            {/* <h1>REGISTER</h1> */}
            {/* <form onSubmit={this.handleSubmit}>
                <label>Email*</label>
                <input type="email" onChange={this.handleChange} name="usermail" placeholder="Email" />
                <label>Password*</label>
                <input type="password" name="password" onChange={this.handleChange} placeholder="Password" />

                <button type="submit">Submit</button>
            </form> */}
            <form class="login" onSubmit={this.handleSubmit}>
        <h1>REGISTER</h1>
            <div class="field" >
                <p class="control has-icons-left has-icons-right">
                    <input class="input" type="email" onChange={this.handleChange} name="usermail" placeholder="Email" />
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
                    <input class="input" name="password" onChange={this.handleChange} placeholder="Password" />
                    <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <button type="submit" class="button is-success">
                    Register
                    </button>
                </p>
            </div>
            </form>
        </div>

    }

}

export default withRouter(Register)