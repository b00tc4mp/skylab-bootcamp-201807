import React, { Component } from 'react'
import logic from '../logic'
import './styles/Profile.css'
import profileIcon from './pics/profile-icon.png'

class Profile extends Component {
    state = {
        loggedIn: logic.loggedIn(),
        username: '',
        password: '',
        msg: '',
        videos: []
    }

    componentWillMount = () => {
        if (this.state.loggedIn)
            logic.retrieveData().then(() => this.setState({ videos: logic._userData.videos }))
    }

    keepUsername = e => this.setState({ username: e.target.value })
    keepPassword = e => this.setState({ password: e.target.value })
    login = () => {
        logic.loginUser(this.state.username, this.state.password)
            .then(() => this.setState({ loggedIn: true }))
            .catch(err => this.setState({ msg: err.message }))
    }
    register = () => {
        logic.registerUser(this.state.username, this.state.password)
            .then(() => this.setState({ msg: 'please, login' }))
            .catch(err => this.setState({ msg: err.message }))
    }
    logout = () => {
        this.props.setMainSrc('')
        logic.logout()
        this.setState({ loggedIn: false })
    }
    unregister = password => logic.unregisterUser(password).then(() => this.logout())
    deleteVideo = id => {
        logic.deleteVideo(id)
            .then(this.setState({ msg: 'deleted !', videos: logic._userData.videos }))
    }

    render() {
        const { onClose, setMainSrc } = this.props
        const { loggedIn, msg, videos } = this.state
        const { login, register, keepUsername, keepPassword, logout, deleteVideo, unregister } = this
        return (
            <div className='profile'>
                <nav className='profile__nav'>
                    <button className='profile__nav__btn' onClick={onClose}> X </button>
                    <img alt='' className='profile__nav__img' src={profileIcon} />
                </nav>
                {!loggedIn && <div className='profile__login'>
                    <div className='profile__login__inputs'>
                        <input type='text' placeholder='username' onChange={keepUsername}></input>
                        <input type='password' placeholder='password' onChange={keepPassword}></input>
                    </div>
                    {msg && <p>{msg}</p>}
                    <div className='profile__login__btns'>
                        <button onClick={login}>Login</button>
                        <p> or </p>
                        <button onClick={register}>Register</button>
                    </div>
                </div>}
                {loggedIn && <div>
                    <button> update profile </button>
                    <button onClick={logout}>logout</button>
                    <button onClick={unregister}>unregister</button>
                    {msg && <p>{msg}</p>}
                    <h3> my videos </h3>
                    {videos.map((video, index) => {
                        return (
                            <div key={index}>
                                <video className='profile__video' src={video.url} autoPlay playsInline muted onClick={() => setMainSrc(video.url)} key={index}></video>
                                <button onClick={() => deleteVideo(video.id)}>delete</button>
                            </div>
                        )
                    })}
                    <h3> models </h3>
                </div>}
            </div>
        )
    }
}

export default Profile