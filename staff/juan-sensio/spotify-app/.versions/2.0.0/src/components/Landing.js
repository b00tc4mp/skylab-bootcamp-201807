import React from 'react'
import './Landing.css'

function Landing(props) {
    return (
        <div className="btn-group">
            <button className="btn" onClick={props.onRegister}>Sign Up</button>
            <p className="btn-group__text"> or </p>
            <button className="btn" onClick={props.onLogin}>Log In</button>
        </div>
    );
}

export default Landing