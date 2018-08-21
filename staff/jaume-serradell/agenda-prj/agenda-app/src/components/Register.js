import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import logic from '../logic'

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
            .catch(({message}) => console.log(message))
    }

    render() {

        return <div class="container">
            <div className="container-block">
                <h1>REGISTER</h1>
                <form onSubmit={this.handleSubmit}>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <input name="usermail" class="input" type="email" onChange={this.handleChange} placeholder="Email" />
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
                            <input name="password" class="input" type="password" onChange={this.handleChange} placeholder="Password" />
                            <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <button class="button is-success" type="submit">Submit</button>
                </form>
            </div>
        </div>

    }

}

export default withRouter(Register)



