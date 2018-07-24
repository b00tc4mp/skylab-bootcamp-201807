import React from 'react'

function GoToLogin({ onLogin }) {
    return <section>
                You have registered OK! You can click next button to LogIn and search for all music you want <button onClick={onLogin}>Login</button>
            </section>
}

export default GoToLogin