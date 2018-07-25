import React, {Component} from 'react'

class UpdatePanel extends Component {

    state = { 
        password: null,
        newUsername: null,
        newPassword: null
    }

    keepPassword = event => this.setState({ password: event.target.value })
    keepNewUsername = event => this.setState({ newUsername: event.target.value })
    keepNewPassword = event => this.setState({ newPassword: event.target.value })

    onUpdate = event => {
        event.preventDefault()
        const { password, newUsername, newPassword } = this.state
        this.props.onUpdate( password, newUsername, newPassword )
    }


    render() {

        return (
            <form  onSubmit={this.onUpdate}>
                <input type="password" onChange={this.keepPassword} placeholder="enter your old password" />
                <input type="text" onChange={this.keepNewUsername} placeholder="enter your new username"/> {/* NewUsername */}
                <input type="password" onChange={this.keepNewPassword} placeholder="enter your new password" /> {/* NewPassword */}
                <button type="submit" >Change</button>
            </form>
        )
    }
}

export default UpdatePanel