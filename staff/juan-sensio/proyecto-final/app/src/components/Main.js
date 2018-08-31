import React, { Component } from 'react';
import logic from '../logic'

import './styles/Main.css'

import Nav from './Nav'
import Profile from './Profile'
import Settings from './Settings'
import Help from './Help'
import Workspace from './Workspace'

const DEFAULT_MAX_DIM = 400
const DEFAULT_FPS = 10
const DEFAULT_ISF = 0.8
const DEFAULT_OS = 16

const BREAK_SCREEN = 700

class Main extends Component {

    state = {
        layout: (window.innerWidth > BREAK_SCREEN),
        profile: (window.innerWidth > BREAK_SCREEN),
        settings: false,
        help: false,
        mainVideoSrc: '',
        workspace: true
    }

    _settings = {
        ISF: DEFAULT_ISF,
        OS: DEFAULT_OS,
        FH: false,
        MAX_DIM: DEFAULT_MAX_DIM,
        FPS: DEFAULT_FPS,
        REF_RATE: 1000 / DEFAULT_FPS,
    }

    setLayout = () => {
        const { layout } = this.state
        const newLayout = (window.innerWidth > BREAK_SCREEN)
        if (layout !== newLayout) {
            if (layout)
                this.setState({ layout: newLayout, workspace: true, profile: false, settings: false, help: false })
            else
                this.setState({ layout: newLayout, profile: true, settings: false, help: false, workspace: true })
        }
    }
    componentWillMount = () => this.setLayout()
    componentDidMount = () => window.addEventListener('resize', this.setLayout)
    componentWillUnmount = () => window.removeEventListener('resize', this.setLayout)

    showProfile = () => {
        if (this.state.layout)
            this.setState({ profile: true, settings: false, help: false })
        else
            this.setState({ profile: !this.state.profile, settings: false, help: false, workspace: this.state.profile ? true : false })
    }
    showSettings = () => {
        if (this.state.layout)
            this.setState({ profile: false, settings: true, help: false })
        else
            this.setState({ profile: false, settings: !this.state.settings, help: false, workspace: this.state.settings ? true : false })
    }
    showHelp = () => {
        if (this.state.layout)
            this.setState({ profile: false, settings: false, help: true })
        else
            this.setState({ profile: false, settings: false, help: !this.state.help, workspace: this.state.help ? true : false })
    }
    setVideoSrc = src => {
        if (this.state.layout)
            this.setState({ mainVideoSrc: src })
        else 
            this.setState({ mainVideoSrc: src, workspace: true, profile: false })
    }

    saveVideo = file => logic.saveVideo(file).then(() => window.location.reload())
    deleteVideo = id => logic.deleteVideo(id).then(() => window.location.reload())

    logout = () => {
        this.setState({ mainVideoSrc: '' })
        this.props.logout()
    }

    updateSetting = (key, value) => this._settings[key] = value

    render() {
        const { profile, settings, help, mainVideoSrc, layout, workspace } = this.state
        const { loggedIn, login, register } = this.props
        const { updateSetting, _settings, logout, showProfile, showSettings, showHelp, setVideoSrc, saveVideo, deleteVideo } = this
        return (
            <div className={'main-' + (layout ? '3by1' : 'single')}>
                <Nav profile={showProfile} settings={showSettings} help={showHelp} />
                {profile && <Profile
                    loggedIn={loggedIn}
                    login={login}
                    register={register}
                    logout={logout}
                    setVideoSrc={setVideoSrc}
                    deleteVideo={deleteVideo}
                />}
                {settings && <Settings settings={_settings} updateSetting={updateSetting} />}
                {help && <Help />}
                {workspace && <Workspace
                    videoSrc={mainVideoSrc}
                    saveVideo={saveVideo}
                    loggedIn={loggedIn}
                    settings={_settings}
                />}
            </div>
        )
    }
}

export default Main