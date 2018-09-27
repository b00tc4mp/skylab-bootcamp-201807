import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import swal from 'sweetalert2'

class FormAdopted extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        address: '',
        info: ''
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    sendForm = (e) => {
        e.preventDefault()
        if (!this.state.name || !this.state.email || !this.state.phone || !this.state.address || !this.state.info) {
            swal({
                type: 'error',
                title: `Missing fields to fill`,
                showConfirmButton: true
            })
        } else {
            swal({
                type: 'info',
                title: 'Email sent correctly',
                showConfirmButton: true,
            })
            return this.props.history.push('/')
        }
    }

    render() {
        return <div>
            <nav class="navbar nav">
                <div class="navbar-start">
                    <Link to='/'><button class="navbar-item logo">MON-GOS</button></Link>
                </div>
            </nav>
            <div className="container-form">
                <h1 className="titleDetailForm title">Adoption Form</h1>
                <form onSubmit={this.sendForm}>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <input class="input" type="text" placeholder="Name" onChange={this.handleChange} name="name" />
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <input class="input" type="email" placeholder="Email" onChange={this.handleChange} name="email" />
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                            </span>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <input class="input" type="text" placeholder="Phone" onChange={this.handleChange} name="phone" />
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <input class="input" type="text" placeholder="Address" onChange={this.handleChange} name="address" />
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <textarea class="textarea" type="text" placeholder="About me..." onChange={this.handleChange} name="info"></textarea>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control">
                            <input class="button is-success" type="submit" value="Send" />
                        </p>
                    </div>
                </form>
            </div>
        </div>
    }
}

export default withRouter(FormAdopted)