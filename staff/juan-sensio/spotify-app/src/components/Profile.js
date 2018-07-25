import React, { Component } from 'react'

import './Profile.css'

class Profile extends Component {

    state = {
        password1: null,
        password2: null,
        password3: null,
        newUsername: null,
        newPassword: null,
        deleteError: null,
        update1: null,
        update2: null
    }

    keepPassword1 = event => this.setState({ password1: event.target.value })
    keepPassword2 = event => this.setState({ password2: event.target.value })
    keepPassword3 = event => this.setState({ password3: event.target.value })
    keepNewUsername = event => this.setState({ newUsername: event.target.value })
    keepNewPassword = event => this.setState({ newPassword: event.target.value })

    updatePassword = () => {
        this.props.updateUser(this.state.password2, '', this.state.newPassword)
            .then(() => this.setState({ update2: 'success' }))
            .catch(err => this.setState({ update2: err.message }))
    }
    updateUsername = () => {
        this.props.updateUser(this.state.password1, this.state.newUsername, this.state.password1)
            .then(() => this.setState({ update1: 'success' }))
            .catch(err => this.setState({ update1: err.message }))
    }
    deleteUser = () => {
        this.props.deleteUser(this.state.password3)
            .catch(err => {
                this.setState({ deleteError: err.message })
            })
    }

    render() {

        const {
            state: {
                update1,
                update2,
                deleteError
            },
            keepPassword1,
            keepPassword2,
            keepPassword3,
            keepNewUsername,
            keepNewPassword,
            updatePassword,
            updateUsername,
            deleteUser
        } = this

        return (
            <div className="profile">
                <button onClick={this.props.onLogout} className="profile__btn profile__btn--logout"> Log out </button>
                <div className="profile__change-username">
                    <h3 className="profile__text"> Change username </h3>
                    <input className="profile__input" placeholder=" password" onChange={keepPassword1}></input>
                    <input className="profile__input" placeholder=" new username" onChange={keepNewUsername}></input>
                    <div>
                        {update1 === 'success' ? <p className="profile__text--success">{update1}</p> : <p className="profile__text--error">{update1}</p>}
                    </div>
                    <button className="profile__btn" onClick={updateUsername}> Update </button>
                </div>
                <div className="profile__change-password">
                    <h3 className="profile__text"> Change password </h3>
                    <input className="profile__input" placeholder=" password" onChange={keepPassword2}></input>
                    <input className="profile__input" placeholder=" new password" onChange={keepNewPassword}></input>
                    <div>
                        {update2 === 'success' ? <p className="profile__text--success">{update2}</p> : <p className="profile__text--error">{update2}</p>}
                    </div>
                    <button className="profile__btn" onClick={updatePassword}> Update </button>
                </div>
                <div className="profile__delete">
                    <h3 className="profile__text"> Delete account </h3>
                    <input className="profile__input" placeholder=" password" onChange={keepPassword3}></input>
                    <div>
                        {deleteError && <p className="profile__text--error">{deleteError}</p>}
                    </div>
                    <button className="profile__btn" onClick={deleteUser}> Delete </button>
                </div>
            </div>
        )
    }
}

export default Profile