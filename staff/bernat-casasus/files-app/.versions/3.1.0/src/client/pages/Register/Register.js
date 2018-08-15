import React, { Component } from 'react'
import './Register.css'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'

class Register extends Component {

    state = {
        username: "",
        password: "",

    }

    keepUserName = e => this.setState({ username: e.target.value })
    keepPassword = e => this.setState({ password: e.target.value })

    handlerRegister = e => {
        e.preventDefault()
        const { state: { username, password } } = this

        logic.register(username, password)
            .then(() => {
                this.setState({
                    username: "",
                    password: "",
                })
                this.props.history.push('/login')
            })
            .catch(({ message }) => {

                this.setState({
                    username: "",
                    password: ""
                })
                console.log(message)
            })
    }

    render() {
        const { state: { username, password },keepUserName, keepPassword, handlerRegister } = this
        return (
            <main>
                <div class="screen">
                    <nav>
                        >  register or <a href="/login">login</a> <span class="blink">_</span>
                    </nav>
                    <form onSubmit={handlerRegister}>
                        <input type="text" name="username" placeholder="username" autofocus required value={username} onChange={keepUserName} />
                        <input type="password" name="password" placeholder="password" required value={password} onChange={keepPassword} />
                        <button type="submit">register</button>
                    </form>
                </div>
            </main>
        )
    }
}

export default withRouter(Register)