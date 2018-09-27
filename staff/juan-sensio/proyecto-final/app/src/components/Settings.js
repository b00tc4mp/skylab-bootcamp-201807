import React from 'react'
import { connect } from 'react-redux'
import { updateSetting } from '../redux/actions'

import './styles/Settings.css'

const mapStateToProps = ({ settings }) => ({
    FPS: settings.FPS,
    MAX_DIM: settings.MAX_DIM,
    ISF: settings.ISF,
    OS: settings.OS
})

const mapDispatchToProps = dispatch => ({
    updateSetting: (key, value) => dispatch(updateSetting(key, value))
})

function Settings(props) {

    const { FPS, MAX_DIM, ISF, OS } = props
    const { updateSetting } = props

    return (
        <div className='settings'>
            <div className='setting'>

                <div className='setting_container'>
                    <div className='setting_container2'>
                        <h4>FPS</h4>
                        <input type='number' placeholder={FPS}
                            onChange={e => {
                                updateSetting('FPS', parseInt(e.target.value, 10))
                                updateSetting('REF_RATE', 1000 / parseInt(e.target.value, 10))
                            }}>
                        </input>
                    </div>
                    <p>
                        The number of images per second to be processed.
                    </p>
                </div>

                <div className='setting_container'>
                    <div className='setting_container2'>
                        <h4>MAX_DIM (px)</h4>
                        <input type='number' placeholder={MAX_DIM}
                            onChange={e => updateSetting('MAX_DIM', parseInt(e.target.value, 10))}>
                        </input>
                    </div>
                    <p>
                        The maximum number of pixels for the input images.
                    </p>
                </div>

                <div className='setting_container'>
                    <div className='setting_container2'>
                        <h4>ISF</h4>
                        <input type='number' placeholder={ISF}
                            onChange={e => updateSetting('ISF', parseFloat(e.target.value))}>
                        </input>
                    </div>
                    <p>
                        Image scaling factor. A number between 0.3 and 1.0 indicating the 
                        reduction factor of the input images. 
                    </p>
                </div>

                <div className='setting_container'>
                    <div className='setting_container2'>
                        <h4>OS</h4>
                        <input type='number' placeholder={OS}
                            onChange={e => updateSetting('OS', parseInt(e.target.value, 10))}>
                        </input>
                    </div>
                    <p>
                        Output stride. Must be 8, 16 or 32. 
                    </p>
                </div>

            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)