import React, { Component } from 'react'

import './styles/Help.css'

import uploadIcon from './pics/upload-icon.svg'
import saveIcon from './pics/save-icon.svg'
import exerciseIcon from './pics/exercise-icon.svg'
import profileIcon from './pics/profile-icon.svg'
import settingsIcon from './pics/settings-icon.svg'
import starsIcon from './pics/stars-icon.svg'
import dancerIcon from './pics/dancer-icon.svg'
import garbageIcon from './pics/garbage-icon.svg'

class Help extends Component {
    state = {
        main: true,
        upload: false,
        capture: false,
        transfer: false
    }

    go2 = (path, element) => {
        switch (path) {
            case 'main':
                this.setState({ main: true, upload: false, capture: false, transfer: false })
                break
            case 'upload':
                this.setState({ main: false, upload: true, capture: false, transfer: false })
                break
            case 'capture':
                this.setState({ main: false, upload: false, capture: true, transfer: false })
                break
            case 'transfer':
                this.setState({ main: false, upload: false, capture: false, transfer: true })
                break
            default:
                break
        }
        //element.scrollTop = 0
        element.scrollIntoView()
    }

    render() {
        const { go2 } = this
        const { main, upload, capture, transfer } = this.state
        return (
            <div className='help' >
                <div ref='main'>
                    {main && <div>
                        <h3>Welcome to Pose2Pose</h3>
                        <p>Pose2Pose is a web application that lets you generate video using Machine Learning.</p>
                        <p>You can upload and save videos, capture the pose in a video using &nbsp;
                    <a href='https://www.npmjs.com/package/@tensorflow-models/posenet' target='_blank' rel='noopener noreferrer'>posenet</a>
                            &nbsp; and then transfer the pose to another video using &nbsp;
                    <a href='https://github.com/affinelayer/pix2pix-tensorflow' target='_blank' rel='noopener noreferrer'>pix2pix</a>.
                    </p>
                        <h3>Instructions</h3>
                        <p className='pointer' onClick={() => go2('upload', this.refs.upload)}>Upload and save a video</p>
                        <p className='pointer' onClick={() => go2('capture', this.refs.capture)}>Capture pose in video</p>
                        <p className='pointer' onClick={() => go2('transfer', this.refs.transfer)}>Transfer pose to new video</p>
                    </div>}
                </div>
                <div ref='upload'>
                    {upload && <div>
                        <button className='pointer back' onClick={() => go2('main', this.refs.main)}>back</button>
                        <h3>Upload</h3>
                        <p>To upload a video click on the upload icon.</p>
                        <div className='icon-background'>
                            <img src={uploadIcon} alt='upload' />
                        </div>
                        <p>Once the video is loaded you can play it by clicking on it in the workspace.</p>
                        <p>In order to save your video you will have to create an account. After logging in
                            you can save your videos by clicking on the save icon.
                    </p>
                        <div className='icon-background'>
                            <img src={saveIcon} alt='save' />
                        </div>
                        <p>Once your video is saved you can load it from your profile.</p>
                        <div className='icon-background-2'>
                            <img src={profileIcon} alt='profile' />
                        </div>
                        <p>You can delete a video by clicking on the delete icon.</p>
                        <div className='icon-background'>
                            <img src={garbageIcon} alt='delete' />
                        </div>
                        <h3>Next Steps</h3>
                        <p className='pointer' onClick={() => go2('capture', this.refs.capture)}>Capture pose</p>
                        <p className='pointer' onClick={() => go2('transfer', this.refs.transfer)}>Transfer pose to new video</p>
                    </div>}
                </div>
                <div ref='capture'>
                    {capture && <div>
                        <button className='pointer back' onClick={() => go2('main', this.refs.main)}>back</button>
                        <h3>Capture</h3>
                        <p>To capture the pose of a video, first click on the video on your profile. Then
                            you can start the pose detection process by clicking on the capture pose icon.
                    </p>
                        <div className='icon-background'>
                            <img src={exerciseIcon} alt='pose' />
                        </div>
                        <p>The process may take a while. Once the process is done, the result will appear in your profile
                            under the datasets tab.
                    </p>
                        <p>You can configure different parameters for the pose detections algorithm in the settings menu.</p>
                        <div className='icon-background-2'>
                            <img src={settingsIcon} alt='settings' />
                        </div>
                        <p>You can delete a dataset by clicking on the delete icon.</p>
                        <div className='icon-background'>
                            <img src={garbageIcon} alt='delete' />
                        </div>
                        <h3>Next Steps</h3>
                        <p className='pointer' onClick={() => go2('transfer', this.refs.transfer)}>Transfer pose to new video</p>
                        <h3>Go back</h3>
                        <p className='pointer' onClick={() => go2('upload', this.refs.upload)}>Upload and save a video</p>
                    </div>}
                </div>
                <div ref='transfer'>
                    {transfer && <div>
                        <button className='pointer back' onClick={() => go2('main', this.refs.main)}>back</button>
                        <h3>Transfer</h3>
                        <p>To transfer the pose of a dataset to a video, first click on the dataset from your profile.
                            Then, click on the start transfer button
                    </p>
                        <div className='icon-background'>
                            <img src={starsIcon} alt='ready-transfer' />
                        </div>
                        <p>Then, select a model from your profile. Once the model is loaded, click on the
                            transfer button and wait for the results to appear in your profile.
                    </p>
                        <div className='icon-background'>
                            <img src={dancerIcon} alt='transfer' />
                        </div>
                        <p>You can delete a result by clicking on the delete icon.</p>
                        <div className='icon-background'>
                            <img src={garbageIcon} alt='delete' />
                        </div>
                        <h3>Go back</h3>
                        <p className='pointer' onClick={() => go2('upload', this.refs.upload)}>Upload and save a video</p>
                        <p className='pointer' onClick={() => go2('capture', this.refs.capture)}>Capture pose</p>
                    </div>}
                </div>
                <h3> Author </h3>
                <p><a href='https://juansensio.github.io' target='_blank' rel='noopener noreferrer'>Juan Sensio </a></p>
            </div>
        )
    }

}

export default Help