import React from 'react'
import './Hero.css'
import { withRouter } from 'react-router-dom'

function Hero() {
    return <div className="hero">
        <h1>SEARCH LOCATIONS</h1>
        <p>On this page you will discover all our locations for the realization of photo shoots and filming.<br />
        This service has been created to facilitate the work of our clients, producers, agencies or photographers, in order to help them to find new spaces in the city.</p>
    </div>
}

export default withRouter(Hero)