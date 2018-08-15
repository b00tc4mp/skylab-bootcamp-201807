import React from 'react';

function Landing({ onRegister, onLogin }){
    return <div className="screen">
        <h1>Welcome to Files App</h1>
        <br />
        <button onClick={onRegister}>Register</button> or <button onClick={onLogin}>Login</button>
    </div>
}

export default Landing