import React from 'react';

import './styles/Settings.css'

function Settings(props) {
    const { FPS, MAX_DIM, ISF, OS } = props.settings
    const { updateSetting } = props
    return (
        <div className='settings'>
            <div className='setting'>
                <p>FPS</p>
                <input type='number' placeholder={FPS}
                    onChange={e => {
                        updateSetting('FPS', parseInt(e.target.value, 10))
                        updateSetting('REF_RATE', 1000 / parseInt(e.target.value, 10))
                    }}>
                </input>
                <p>MAX_DIM (px)</p>
                <input type='number' placeholder={MAX_DIM}
                    onChange={e => updateSetting('MAX_DIM', parseInt(e.target.value, 10))}>
                </input>
                <p>ISF (0.3 - 1.0)</p>
                <input type='number' placeholder={ISF}
                    onChange={e => updateSetting('ISF', parseFloat(e.target.value))}>
                </input>
                <p>OS (8, 16 or 32)</p>
                <input type='number' placeholder={OS}
                    onChange={e => updateSetting('OS', parseInt(e.target.value, 10))}>
                </input>
            </div>
        </div>
    )
}

export default Settings