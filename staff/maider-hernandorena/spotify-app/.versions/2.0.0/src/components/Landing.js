import React from 'react'
import './css/landing.css'

function Landing({ onRegister, onLogin }) {
    return <section className="landing" >
                <button className="landing__button" onClick={onRegister}>Register</button> <button className="landing__button" onClick={onLogin}>Login</button>
            </section>
}

export default Landing