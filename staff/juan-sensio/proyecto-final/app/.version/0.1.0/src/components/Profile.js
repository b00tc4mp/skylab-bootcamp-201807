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
        data: false
    }

    componentDidMount = () => {
        if(this.state.loggedIn) 
            logic.retrieveData().then(() => this.setState({data: true}))
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
        this.setState({loggedIn: false})
    }

    render() {
        const { onClose, setMainSrc } = this.props
        const { loggedIn, msg, data } = this.state
        const { login, register, keepUsername, keepPassword, logout } = this
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
                    <h3> my videos </h3>
                    {data && logic._userData.videos.map( (video, index) => <video className='profile__video' src={video.url} autoPlay playsInline muted loop onClick={() => setMainSrc(video.url)} key={index}></video>)}
                    <h3> models </h3>
                    <button> update profile </button>
                    <button onClick={logout}>logout</button>
                </div>}
            </div>
        )
    }
}

export default Profile