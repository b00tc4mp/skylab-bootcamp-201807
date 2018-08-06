import React, { Component } from 'react'
import './Profile.css' 

import UpdateUser from './UpdateUser'
import UpdatePassword from './UpdatePassword'
import DeleteUser from './DeleteUser'

class Profile extends Component {
    state = {
        updateUsernameActive: false,
        updatePasswordActive: false,
        deleteActive: false
    }

    handleUpdateUsername = () => this.setState({
        updateUsernameActive: this.state.updateUsernameActive ? false : true,
        updatePasswordActive: false,
        deleteActive: false
    })
    handleUpdatePassword = () => this.setState({
        updatePasswordActive: this.state.updatePasswordActive ? false : true,
        deleteActive: false,
        updateUsernameActive: false
    })
    handleDelete = () => this.setState({
        updateUsernameActive: false,
        updatePasswordActive: false,
        deleteActive: this.state.deleteActive ? false : true
    })

    updateUser = (newUsername, password) => {
        this.props.onUpdate(password, newUsername, password)
    }
    updatePassword = (password, newPassword) => {
        this.props.onUpdate(password, '', newPassword)
    }
    deleteUser = password => {
        if(this.props.deleteStatus !== 0)
            this.setState({deleteActive: false})
        this.props.onDelete(password)
    }

    render() {
        const { state: { updateUsernameActive, updatePasswordActive, deleteActive } } = this
        return (
            <div className="profile">
                <button className="profile__btn" onClick={this.handleUpdateUsername}>Update Username</button>
                <button className="profile__btn" onClick={this.handleUpdatePassword}>Update Password</button>
                <button className="profile__btn" onClick={this.handleDelete}>Delete Account</button>
                {updateUsernameActive && <UpdateUser onUpdate={this.updateUser} />}
                {updatePasswordActive && <UpdatePassword onUpdate={this.updatePassword} />}
                {deleteActive && <DeleteUser onDelete={this.deleteUser} deleteStatus={this.props.deleteStatus}/>}
            </div>
        )
    }
}

export default Profile
