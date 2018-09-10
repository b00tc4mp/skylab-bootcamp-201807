import React, { Component } from 'react'
import { withRouter, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setVideo, setActions } from '../redux/actions'
import logic from '../logic'

import './styles/Profile.css'

import Login from './Login'
import Register from './Register'
import Account from './Account'
import MainProfile from './MainProfile'

const mapDispatchToProps = dispatch => ({
    setVideo: (video, type) => dispatch(setVideo(video, type)),
    setActions: actions => dispatch(setActions(actions))
})

class Profile extends Component {

    componentWillMount = () => {
        if (!logic.loggedIn())
            this.showLogin()
    }

    showRegister = () =>
        this.props.history.push('/profile/register')

    showLogin = () =>
        this.props.history.push('/profile/login')

    toggleAccount = () => {
        const path = this.props.location.pathname
        if (path === '/profile/account')
            this.props.history.push('/profile')
        else
            this.props.history.push('/profile/account')
    }

    register = (username, password) =>
        logic.registerUser(username, password)

    login = (username, password) =>
        logic.loginUser(username, password)
            .then(() => {
                this.resetVideo()
                this.forceUpdate()
            })

    logout = () => {
        logic.logout()
        this.resetVideo()
        this.showLogin()
    }

    resetVideo = () => {
        this.props.setVideo({ video: { url: '', id: '' }, type: '' })
        this.props.setActions({ save: false, pose: false, prepTransfer: false, transfer: false, delete: false, dataset: { url: '', id: '' } })
    }

    render() {
        const loggedIn = logic.loggedIn()
        const { setVideoSrc, deleteVideo } = this.props
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

export default withRouter(connect(null, mapDispatchToProps)(Profile))