import React, { Component } from 'react'

import logic from '../logic'

import './styles/Account.css'

class Account extends Component {

    state = {
        password: '',
        newUsername: '',
        newPassword: '',
        msg: ''
    }

    keepPassword = e => this.setState({ password: e.target.value })
    keepNewPassword = e => this.setState({ newPassword: e.target.value })
    keepNewUsername = e => this.setState({ newUsername: e.target.value })

    updateUsername = () =>
        logic.updateUsername(this.state.password, this.state.newUsername)
            .then(() => this.setState({ msg: 'username updated' }))
            .catch(err => this.setState({ msg: err.message }))
    updatePassword = () =>
        logic.updatePassword(this.state.password, this.state.newPassword)
            .then(() => this.setState({ msg: 'password updated' }))
            .catch(err => this.setState({ msg: err.message }))
    deleteAccount = () =>
        logic.unregisterUser(this.state.password)
            .then(() => this.props.logout())
            .catch(err => this.setState({ msg: err.message }))

    render() {
        const { msg } = this.state
        const { close, logout } = this.props
        const { keepNewPassword, keepNewUsername, keepPassword, updatePassword, updateUsername, deleteAccount } = this
        return (
            <div className='account'>
                <button onClick={close}>back</button>
                <div className='account__main'>
                    <div className='account__group'>
                        <h3>Change username</h3>
                        <input placeholder='password' type='password' onChange={keepPassword} />
                        <input placeholder='new username' type='text' onChange={keepNewUsername} />
                        <button onClick={updateUsername}>Update</button>
                    </div>
                    <div className='account__group'>
                        <h3>Change password</h3>
                        <input placeholder='password' type='password' onChange={keepPassword} />
                        <input placeholder='new password' type='password' onChange={keepNewPassword} />
                        <button onClick={updatePassword}>Update</button>
                    </div>
                    <div className='account__group2'>
                        <h3>Delete account</h3>
                        <input placeholder='password' type='password' onChange={keepPassword} />
                        <button onClick={deleteAccount}>Delete account</button>
                    </div>
                    <div>
                        {msg && <p style={{color: 'red'}}>{msg}</p>}
                    </div>
                    <button className='account__logout' onClick={logout}>logout</button>
                </div>
            </div>
        )
    }
}

export default Account