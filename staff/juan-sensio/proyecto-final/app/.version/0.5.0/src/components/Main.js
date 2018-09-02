import React, { Component } from 'react';
import logic from '../logic'
import { connect } from "react-redux"
import { setLayout } from '../redux/actions'

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

const mapStateToProps = state => {
    return {
        layout: state.layout.layout,
        workspace: state.layout.workspace,
        profile: state.layout.profile,
        settings: state.layout.settings,
        help: state.layout.help
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setLayout: layout => dispatch(setLayout(layout))
    }
}

class Main extends Component {

    state = {
        mainVideoSrc: ''
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
        const { layout } = this.props
        const newLayout = (window.innerWidth > BREAK_SCREEN)
        if (layout !== newLayout) {
            if (layout)
                this.props.setLayout({
                    layout: newLayout,
                    workspace: true,
                    profile: false,
                    settings: false,
                    help: false
                })
            else
                this.props.setLayout({
                    layout: newLayout,
                    profile: true,
                    settings: false,
                    help: false,
                    workspace: true
                })
        }
    }
    componentWillMount = () => this.setLayout()
    componentDidMount = () => window.addEventListener('resize', this.setLayout)
    componentWillUnmount = () => window.removeEventListener('resize', this.setLayout)
 
    setVideoSrc = src => {
        if (this.props.layout)
            this.setState({ mainVideoSrc: src })
        else {
            this.setState({ mainVideoSrc: src})
            this.props.setLayout({workspace: true, profile: false })
        }
    }

    saveVideo = file => logic.saveVideo(file).then(() => window.location.reload())
    deleteVideo = id => logic.deleteVideo(id).then(() => window.location.reload())

    logout = () => {
        this.setState({ mainVideoSrc: '' })
        this.props.logout()
    }

    updateSetting = (key, value) => this._settings[key] = value

    render() {
        const { mainVideoSrc } = this.state
        const { loggedIn, login, register, layout,profile, settings, help, workspace } = this.props
        const { updateSetting, _settings, logout, showProfile, showSettings, showHelp, setVideoSrc, saveVideo, deleteVideo } = this
        return (
            <div className={'main-' + (layout ? '3by1' : 'single')}>
                <Nav />
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
