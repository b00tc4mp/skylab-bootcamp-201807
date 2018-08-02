import React, {Component} from 'react'
import Feedback from './Feedback'

class Profile extends Component {

    state = {
        password: null,
        newUsername: null,
        newPassword: null,
    }
    
    savePassword = event => this.setState({ password: event.target.value })

    saveNewUsername = event => this.checkNewUsername(event.target.value)

    saveNewPassword = event => this.checkNewPassword(event.target.value)

    checkNewUsername = value => {
        const regex = (/^[a-zA-Z0-9]+$/)
        let regexOk = value.match(regex)

        if (regexOk !== null ) this.setState({newUsername: value})    
    }

    checkNewPassword = value => {
        const regex = (/^[a-zA-Z0-9]+$/)
        let regexOk = value.match(regex)

        if (regexOk !== null ) this.setState({newPassword: value})    
    }

    update = event => {
        event.preventDefault()
        const { password, newUsername, newPassword } = this.state
        this.props.onUpdate( password, newUsername, newPassword )
    }

    deleteUser = event => {
        event.preventDefault()
        const { password } = this.state
        this.props.onDelete( password)
    }

    render() {
        const {savePassword, saveNewUsername, saveNewPassword, update, deleteUser} = this
        return <section>
                    <section>
                        <h2>Update your Profile</h2>
                        <p>it is required to fill in the field with the * symbol</p>
                        <form onSubmit={update}>
                            <input type="password" placeholder="Password" onChange={savePassword}/>
                            <input type="text" placeholder="New username" onChange={saveNewUsername}/>
                            <input type="password" placeholder="New password" onChange={saveNewPassword}/>
                            <button type="submit">Update</button>
                        </form>
                        {this.props.feedback && <Feedback message={this.props.feedback} />}
                    </section>
                    <section>
                        <h2>Delete your Profile</h2>
                        <p>it is required to fill in the field with the * symbol</p>
                        <form onSubmit={deleteUser}>
                            <input type="password" placeholder="Password*" onChange={savePassword}/>
                            <button type="submit">Delete</button>
                        </form>
                        {this.props.feedbackdelete && <Feedback message={this.props.feedbackdelete} />}
                    </section>
                </section>
    }
}

export default Profile