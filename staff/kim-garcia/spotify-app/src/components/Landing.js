import React from 'react'

function Landing({onRegister, onLogin}){
    return <section>
        <button onClick={onRegister}> Register</button>
        <button onClick={onLogin}> Login </button>
        </section>
}

export default Landing