import React, { Component } from 'react'
import swal from 'sweetalert'
import ErrorPanel from './ErrorPanel'

// import Feedback from './Feedback'

class UpdateUser extends Component {
    state = { newUsername: null, newPassword: null }

    keepNewUsername = event => this.setState({ newUsername: event.target.value })

    keepPassword = event => this.setState({password: event.target.value })

    keepNewPassword = event => this.setState({ newPassword: event.target.value })

    onUpdate = event => {
        event.preventDefault()

        const { password, newUsername, newPassword } = this.state

        this.props.onUpdate(password, newUsername, newPassword)

        swal("Good job!", "Successfully updated profile", "success");
    }

    render() {
        return <section>
            <form onSubmit={this.onUpdate}>
                <input type="text" placeholder="New Username" onChange={this.keepNewUsername} />

                <input type="password" placeholder="Password (Required)" onChange={this.keepPassword} required />

                <input type="password" placeholder="New Password" onChange={this.keepNewPassword} />

                <button type="submit">Update</button>
            </form>
            {/* {this.props.error && <Feedback message={this.props.error} />} */}
            {this.props.error && <ErrorPanel message={this.props.error} />}
        </section>
    }
}

export default UpdateUser
