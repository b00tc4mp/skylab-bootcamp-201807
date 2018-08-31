import React, { Component } from 'react';

import './styles/Profile.css'

import Login from './Login'
import Register from './Register'
import Account from './Account'
import MainProfile from './MainProfile'

class Profile extends Component {

    state = {
        _register: false,
        _login: true,
        account: false
    }

    showRegister = () => this.setState({ _register: true, _login: false })
    showLogin = () => this.setState({ _register: false, _login: true })
    toggleAccount = () => this.setState({ account: !this.state.account })
    logout = () => {
        this.setState({account: false})
        this.props.logout()
    }
    
    render() {
        const { _register, _login, account } = this.state
        const { loggedIn, login, register, setVideoSrc, deleteVideo } = this.props
        const { showRegister, showLogin, toggleAccount, logout } = this
        return (
            <div className='profile'>
                {!loggedIn && _login && <Login login={login} register={showRegister} />}
                {!loggedIn && _register && <Register login={showLogin} register={register} />}
                {loggedIn && account && <Account close={toggleAccount} logout={logout} />}
                {loggedIn && !account && <div className='profile__container'>
                    <button onClick={toggleAccount}>Account</button>
                    <MainProfile setVideoSrc={setVideoSrc} deleteVideo={deleteVideo}/>
                </div>}
            </div>
        )
    }
}

export default Profile