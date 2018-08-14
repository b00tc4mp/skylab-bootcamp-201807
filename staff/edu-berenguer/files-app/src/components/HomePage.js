import React from 'react'
import { withRouter } from 'react-router-dom'

function HomePage ({ onRegister, onLogin }) {
    return (
        <div>
            <header>
            <h1 className="off">FILES</h1>
        </header>
        <main>
            <div className="screen">
                <nav>
                    <a href="/register" onClick={onRegister}>register</a> or <a href="/login" onClick={onLogin}>login</a> <span className ="blink">_</span>
                </nav>
            </div>
        </main>
        <footer>
            <span className="power on">&#x23FB;</span>
        </footer>
        </div>
    )
}

export default withRouter(HomePage)