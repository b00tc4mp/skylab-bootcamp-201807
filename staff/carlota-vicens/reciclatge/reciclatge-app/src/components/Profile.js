import React, { Component } from 'react'
import Navbar from './NavBar.js'

import './styles/Profile.css'
class Profile extends Component {

    state = {
        password: null,
        password2: null,
        newPassword: null,
        deleteError: null,
        update1: null,
        update: null,
        email: null
    }

    keepPassword = event => this.setState({ password: event.target.value })
    keepPassword2 = event => this.setState({ password2: event.target.value })
    keepNewPassword = event => this.setState({ newPassword: event.target.value })

    /** This is the function to update the user password */
    updatePassword = () => {
        this.props.updateUser(this.state.password, this.state.newPassword)
            .then(() => this.setState({ update: 'success' }))
            .catch(err => this.setState({ error: 'wrong password' }))
    } 


    /** This is the function to delete the user */
    deleteUser = () => {
        this.props.deleteUser(this.state.password2)
        .catch(err => {
            this.setState({ deleteError: 'wrong password' })
        })
    }

    render() {

        const {
            state: {
                update,
                deleteError
            },
            keepPassword,
            keepPassword2,
            keepNewPassword,
            updatePassword,
            deleteUser
        } = this

        return (
            <div className="profile">
                <Navbar />
                <h1 className='profile__title'>Profile</h1>
                <div className="profile__change-password">
                    <h3 className="profile__text"> Update password </h3>
                    <input type="password" className="profile__input" placeholder=" password" onChange={keepPassword}></input>
                    <input type="password" className="profile__input" placeholder=" new password" onChange={keepNewPassword}></input>
                    <div>
                        {update === 'success' ? <p className="profile__text--success">{update}</p> : <p className="profile__text--error">{update}</p>}
                    </div>
                    <button type="password" className="profile__btn" onClick={updatePassword}> Update </button>
                </div>
                <div className="profile__delete">
                    <h3 className="profile__text"> Delete account </h3>
                    <input type="password" className="profile__input" placeholder=" password" onChange={keepPassword2}></input>
                    <div>
                        {deleteError && <p className="profile__text--error">{deleteError}</p>}
                    </div>
                    <button className="profile__btn" onClick={deleteUser}> Delete </button>
                </div>
                <button onClick={this.props.onLogout} className="profile__btn profile__btn--logout"> Log out </button>
            </div>
        )
    }
}

export default Profile