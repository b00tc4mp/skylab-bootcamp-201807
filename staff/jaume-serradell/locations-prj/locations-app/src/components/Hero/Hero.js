import React from 'react'
import './Hero.css'
import { withRouter } from 'react-router-dom'

function Hero() {
    return <div className="hero">
        <h1>SEARCH LOCATIONS</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc velit metus, aliquam ut magna at, venenatis feugiat ante. Vestibulum tempus elit quam, sit amet porttitor ipsum viverra non. Aliquam a urna ac nibh mattis elementum et varius ligula. Suspendisse consectetur, augue non ornare gravida, nisl mauris rutrum ligula, vitae dictum diam leo a nibh.</p>
    </div>
}

export default withRouter(Hero)