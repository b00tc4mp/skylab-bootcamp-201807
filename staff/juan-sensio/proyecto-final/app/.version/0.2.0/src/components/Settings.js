import React, { Component } from 'react'
import './styles/Settings.css'
import settingsIcon from './pics/settings-icon.png'

class Settings extends Component {
    render() {
        const { onClose } = this.props
        return (
            <div className='settings'>
                <nav className='settings__nav'>
                    <img className='settings__nav__img' src={settingsIcon} alt=''/>
                    <button className='settings__nav__btn' onClick={onClose}> X </button>
                </nav>
            </div>
        )
    }
}

export default Settings