import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Redirect } from 'react-router-dom'
import logic from '../logic'
import { login, logout } from '../redux/actions'

import './styles/Profile.css'

import Login from './Login'
import Register from './Register'
import Account from './Account'
import MainProfile from './MainProfile'

const mapStateToProps = state => ({
    loggedIn: state.user.loggedIn
})

const mapDispatchToProps = dispatch => ({
    login: () => dispatch(login()),
    logout: () => dispatch(logout())
})

class Profile extends Component {

    componentWillMount = () => {
        if (!this.props.loggedIn)
            this.showLogin()
    }

    showRegister = () => this.props.history.push('/profile/register')
    showLogin = () => this.props.history.push('/profile/login')
    toggleAccount = () => {
        const path = this.props.location.pathname
        if (path === '/profile/account')
            this.props.history.push('/profile')
        else
            this.props.history.push('/profile/account')
    }
    logout = () => {
        logic.logout()
        this.props.logout()
        this.showLogin()
    }

    register = (username, password) =>
        logic.registerUser(username, password)

    login = (username, password) =>
        logic.loginUser(username, password)
            .then(() => this.props.login(true))

    // unregister = password =>
    //   logic.unregisterUser(password)
    //     .then(() => this.logout())

    render() {
        const { setVideoSrc, deleteVideo, loggedIn } = this.props
        const { showRegister, showLogin, toggleAccount, login, logout, register } = this
        return (
            <div className='profile'>
                <Route path='/profile/login' render={() => !loggedIn ? <Login login={login} register={showRegister} /> : <Redirect to='/profile' />} />
                <Route path='/profile/register' render={() => !loggedIn ? <Register login={showLogin} register={register} /> : <Redirect to='/profile' />} />
                <Route path='/profile/account' render={() => loggedIn ? <Account close={toggleAccount} logout={logout} /> : <Redirect to='/profile' />} />
                <Route exact path='/profile' render={() => loggedIn ?
                    <div className='profile__container'>
                        <button onClick={toggleAccount}>Account</button>
                        <MainProfile setVideoSrc={setVideoSrc} deleteVideo={deleteVideo} />
                    </div> : <Redirect to='/profile/login' />
                } />
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))