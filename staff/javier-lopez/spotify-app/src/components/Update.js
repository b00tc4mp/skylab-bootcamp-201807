import React, { Component } from 'react'

class Update extends Component {
    state = { username: null, password: null }

    keepUsername = event => this.setState({ username: event.target.value })

    keepPassword = event => this.setState({ password: event.target.value })

    onUpdate = event => {
        event.preventDefault()

        const { username, password } = this.state

        this.props.onUpdate(username, password)
    }

    render() {
        return <form onSubmit={this.onUpdate}>
            <input type="text" onChange={this.keepUsername} />
            <input type="password" onChange={this.keepPassword} />
            <button type="submit">Update</button>
        </form>
    }
}

export default Update