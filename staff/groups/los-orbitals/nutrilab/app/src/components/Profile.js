import React, {Component} from 'react'
import Feedback from './Feedback'
import '../sass/profile.css'

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
        return <section className="profile">
                    <section className="profile__update">
                        <h2 className="profile__update__title">Update profile</h2>
                        <p className="profile__update__text">it is required to fill in the field with the * symbol</p>
                        {this.props.feedback && <Feedback message={this.props.feedback} />}
                        <form onSubmit={update}>
                            <input type="password" placeholder="Password*" onChange={savePassword}/>
                            <input type="text" placeholder="New username" onChange={saveNewUsername}/>
                            <input type="password" placeholder="New password" onChange={saveNewPassword}/>
                            <button type="submit">Update</button>
                        </form>
                    </section>
                    <section className="profile__delete">
                        <h2 className="profile__delete__title">Delete profile</h2>
                        <p className="profile__delete__text">it is required to fill in the field with the * symbol</p>
                        {this.props.feedbackdelete && <Feedback message={this.props.feedbackdelete} />}
                        <form onSubmit={deleteUser}>
                            <input type="password" placeholder="Password*" onChange={savePassword}/>
                            <button type="submit">Delete</button>
                        </form>
                    </section>
                </section>
    }
}

export default Profile