import React from 'react'

import './styles/Help.css'

function Help(props) {
    return (
        <div className='help'>
            <h3>Welcome to Pose2Animation</h3>
            <p>This webapp lets you capture the pose in a video using &nbsp;
                    <a href='https://www.npmjs.com/package/@tensorflow-models/posenet' target='_blank' rel='noopener noreferrer'>posenet</a>.
                </p>
            <p> You can create an account in order to save your videos.</p>
            <p> Upload a video or choose one from your gallery, configure the settings and
                capture the pose.
                </p>
            <h3> Author </h3>
            <p><a href='https://juansensio.github.io' target='_blank' rel='noopener noreferrer'>Juan Sensio </a></p>
        </div>
    )

}

export default Help