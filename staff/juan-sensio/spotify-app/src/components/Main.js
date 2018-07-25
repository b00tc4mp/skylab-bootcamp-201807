import React, { Component } from 'react'

import './Main.css'

import Profile from './Profile'
import Navbar from './Navbar'
import Search from './Search'

import logic from '../logic'

class Main extends Component {
    state = {
        searchActive: true,
        profileActive: false
    }

    onProfile = () => this.setState({ searchActive: false, profileActive: true })
    onSearch = () => this.setState({ searchActive: true, profileActive: false })
    logout = () => {
        this.setState({ profileActive: false })
        this.props.onLogout()
    }
    updateUser = (password, newUsername, newPassword) => {
        return logic.updateUser(password, newUsername, newPassword)
    }
    deleteUser = (password) => {
        return logic.unregisterUser(password)
            .then(() => {
                this.logout()
            })
    }

    render() {
        const {
            state: {
                profileActive,
                searchActive
            },
            onProfile,
            onSearch,
            logout,
            updateUser,
            deleteUser,
        } = this

        return (
            <div className="main">
                {searchActive && <Search />}
                {profileActive && <Profile onLogout={logout} updateUser={updateUser} deleteUser={deleteUser}/>}
                <Navbar profile={onProfile} search={onSearch} />
            </div>
        )
    }
}

export default Main