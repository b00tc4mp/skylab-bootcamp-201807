import React, { Component } from 'react'
import Feedback from './Feedback'

class Profile extends Component {
    state = {
        newUsername: this.props.username,
        password: null,
        newPassword: null
    }

    keepUsername = event => {
        const newUsername = event.target.value

        this.setState({ newUsername })
    }

    keepPassword = event => {
        const password = event.target.value

        this.setState({ password })
    }

    keepNewPassword = event => {
        const newPassword = event.target.value

        this.setState({ newPassword })
    }

    onUpdate = event => {
        event.preventDefault()

        const { newUsername, password, newPassword } = this.state

        this.props.onUpdate(password, newUsername, newPassword)
    }

    render() {
        return <section>
            <h1>Profile</h1>
            <form onSubmit={this.onUpdate}>
                <input type="text" placeholder="Username" onChange={this.keepUsername} value={this.state.newUsername} /><br />
                <label>Current password:</label>
                <input type="password" onChange={this.keepPassword}/><br />
                <label>New password (optional):</label>
                <input type="password" onChange={this.keepNewPassword} /><br />
                <button type="submit">Update</button>
            </form>
            { this.props.error && <Feedback message={this.props.error} />}
            { this.props.success && <Feedback message={this.props.success} positive={true} />}
        </section>
    }
}

export default Profile

