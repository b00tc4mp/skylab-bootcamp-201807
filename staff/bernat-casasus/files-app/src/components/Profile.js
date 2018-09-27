import React, { Component } from 'react'
import logic from '../logic'

class Profile extends Component {
    state = {
        username: '',
        password: '',
        newPassword: '',
        succeeded: false,
        error: ''
    }

    onUsernameChanged = e => this.setState({ username: e.target.value })

    onPasswordChanged = e => this.setState({ password: e.target.value })

    onNewPasswordChanged = e => this.setState({ newPassword: e.target.value })

    onUpdateSubmitted = e => {
        e.preventDefault()

        const { state: { username, password, newPassword }, props: { token } } = this

        logic.updateUserProfile(username, password, newPassword, token)
            .then(() => this.setState({ succeeded: true }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    render() {
        const { succeeded,error } = this.state

        return <main>
        {!succeeded ? <div className="screen">
            <nav>
                &gt; profile or <a href="/#/files">files</a> <span className="blink">_</span>
            </nav>
            <form onSubmit={this.onUpdateSubmitted}>
                <input type="text" name="username" placeholder="username" autoFocus onChange={this.onUsernameChanged} />
                <input type="password" name="password" placeholder="password" onChange={this.onPasswordChanged} />
                <input type="password" name="password" placeholder="new password" onChange={this.onNewPasswordChanged} />
                <button type="submit">update</button>
            </form>
            {error && <p>{error}</p>}
        </div> : <div className="screen">
                <nav>
                    &gt; Data updated successfully, now you can proceed to <a href="/#/files">files</a> <span className="blink">_</span>
                </nav>
            </div>}
    </main>
    }
}

export default Profile