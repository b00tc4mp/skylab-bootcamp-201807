import React from 'react';
import './styles/Nav.css'

import profileIcon from './pics/profile-icon.svg'
import settingsIcon from './pics/settings-icon.svg'
import helpIcon from './pics/help-icon.svg'

function Nav(props) {
    const { profile, settings, help } = props
    return (
        <nav className='nav'>
            <img onClick={profile} className='nav__icon nav__icon--profile' src={profileIcon} alt='profile-icon' />
            <img onClick={settings} className='nav__icon nav__icon--settings' src={settingsIcon} alt='settongs-icon' />
            <img onClick={help} className='nav__icon nav__icon--help' src={helpIcon} alt='help-icon' />
        </nav>
    )

}

export default Nav