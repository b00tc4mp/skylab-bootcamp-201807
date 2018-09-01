import React, { Component } from 'react'
import logic from '../logic'

class Register extends Component {
    state = {
        nickname: '',
        email: '',
        password: '',
        succeeded: false,
        error: ''
    }

    onEmailChanged = e => this.setState({ email: e.target.value })
    onNicknameChanged = e => this.setState({ nickname: e.target.value })

    onPasswordChanged = e => this.setState({ password: e.target.value })

    onRegisterSubmitted = e => {
        e.preventDefault()

        const { nickname, password ,email} = this.state

        logic.register(email, nickname, password)
            .then(() => this.setState({ succeeded: true }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    render() {
        const { succeeded, error } = this.state

        return <main>
            {!succeeded ? <div className="screen">
                <nav>
            register or <a href="/#/login">login</a>
                </nav>
                <form onSubmit={this.onRegisterSubmitted}>
                    <input type="text" name="email" placeholder="email" autoFocus onChange={this.onEmailChanged} />
                    <input type="text" name="nickname" placeholder="nickname" autoFocus onChange={this.onNicknameChanged} />
                    <input type="password" name="password" placeholder="password" onChange={this.onPasswordChanged} />
                    <button type="submit">register</button>
                </form>
                {error && <p>{error}</p>}
            </div> : <div className="screen">
                    <nav>
                        User register successfully, now you can proceed to <a href="/#/login">login</a>
                    </nav>
                </div>}
        </main>
    }
}

export default Register