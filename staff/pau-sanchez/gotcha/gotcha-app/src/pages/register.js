import React, {Component} from 'react'
import {logic} from '../logic'

export default class Register extends Component {

    state = {
        name: '',
        password: '',
        email: '',
        success: false,
        error:''
    }

    nameChange = e => this.setState({ name: e.target.value})
    passwordChange = e => this.setState({ password: e.target.value})
    emailChange = e => this.setState({email: e.target.value})

    onRegister = e => {
        e.preventDefault()

        const { name, password, email } = this.state

        logic.register(email, password, name)
            .then(() => this.setState({ succedeed: true }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    render() {
        const { success, error } = this.state

        return (
            <main>
                <h1>REGISTER</h1>
                {!success ? 
                <div>
                    <nav>

                    </nav>
                    <form onSubmit={this.onRegister}>
                        <input type="text" name="name" placeholder="Name" onChange={this.nameChange} />
                        <input type="password" name="password" placeholder="Password" onChange={this.passwordChange} />
                        <input type="email" name="email" placeholder="e@mail.com" onChange={this.emailChange} />
                        <button type="submit">register</button>

                    </form>
                    {error && <p>{error}</p>}
                </div> : <div>
                    <nav>
                        User register success
                    </nav>
                </div>}
             </main>
            
        )
    }
}