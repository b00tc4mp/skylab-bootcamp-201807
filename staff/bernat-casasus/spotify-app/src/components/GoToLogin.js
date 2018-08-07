import React from 'react'

function GoToLogin({ onLogin }) {
    return <section>
        User registered ok! You can now go to <button onClick={onLogin}>Login</button>
    </section>
}

export default GoToLogin