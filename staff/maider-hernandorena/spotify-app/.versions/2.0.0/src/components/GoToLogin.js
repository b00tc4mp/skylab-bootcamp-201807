import React from 'react'
import './css/goToLogin.css'

function GoToLogin({ onLogin }) {
    return <section className="goToLogin">
                <p className="goToLogin__text">You have registered OK! You can click next button to LogIn and search for all music you want</p>
                <button className="goToLogin__button" onClick={onLogin}>Login</button>
            </section>
}

export default GoToLogin