import React, {Component} from 'react'
import Feedback from './Feedback'
import '../sass/profile.css'

class Update extends Component {

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

    linkToDeleteProfile = (event) => {
        event.preventDefault()
        this.props.linkToDeleteProfile()
    }

    render() {
        const {savePassword, saveNewUsername, saveNewPassword, update, linkToDeleteProfile} = this
        return <section className="profile__update">
                        <h2 className="profile__update__title">Update profile</h2>
                        <p className="profile__update__text">* fields are required</p>
                        {this.props.feedback && <Feedback message={this.props.feedback} />}
                        <form onSubmit={update}>
                            <input type="password" placeholder="Password*" onChange={savePassword}/>
                            <input type="text" placeholder="New username" onChange={saveNewUsername}/>
                            <input type="password" placeholder="New password" onChange={saveNewPassword}/>
                            <button type="submit">Update</button>
                        </form>
                    <p>Go to <a href="/#" onClick={linkToDeleteProfile}>Delete profile</a></p> 
                    </section>
    }
}

export default Update