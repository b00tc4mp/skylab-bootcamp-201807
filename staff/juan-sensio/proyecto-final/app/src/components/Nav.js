import React from 'react';
import { connect } from "react-redux"
import { setLayout } from '../redux/actions'

import './styles/Nav.css'

import profileIcon from './pics/profile-icon.svg'
import settingsIcon from './pics/settings-icon.svg'
import helpIcon from './pics/help-icon.svg'

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

function Nav(props) {
    
    const { setLayout, layout, workspace, profile, settings, help } = props
    
    function showProfile() {
        if (layout)
            setLayout({ layout, profile: true, settings: false, help: false, workspace: true })
        else
            setLayout({ layout, profile: !profile, settings: false, help: false, workspace: profile ? true : false })
    }
    
    function showSettings() {
        if (layout)
            setLayout({ layout, profile: false, settings: true, help: false, workspace: true })
        else
            setLayout({ layout, profile: false, settings: !settings, help: false, workspace: settings ? true : false })
    }
    
    function showHelp() {
        if (layout)
            setLayout({ layout, profile: false, settings: false, help: true, workspace: true})
        else
            setLayout({ layout, profile: false, settings: false, help: !help, workspace: help ? true : false })
    }

    return (
        <nav className='nav'>
            <img onClick={showProfile} className='nav__icon nav__icon--profile' src={profileIcon} alt='profile-icon' />
            <img onClick={showSettings} className='nav__icon nav__icon--settings' src={settingsIcon} alt='settongs-icon' />
            <img onClick={showHelp} className='nav__icon nav__icon--help' src={helpIcon} alt='help-icon' />
        </nav>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
