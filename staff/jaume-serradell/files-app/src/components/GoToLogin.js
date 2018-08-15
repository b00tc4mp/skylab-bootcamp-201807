import React from 'react'

function GoToLogin({ onLogin }) {
    return <div className="screen">
        User registered ok! You can now go to <button onClick={onLogin}>Login</button>
    </div>
}

export default GoToLogin