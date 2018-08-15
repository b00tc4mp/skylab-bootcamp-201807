import React from 'react'
import {withRouter} from 'react-router-dom'

function Landing({ onRegister, onLogin }) {
    return <section>
        <button onClick={onRegister}>Register</button> or <button onClick={onLogin}>Login</button> 
    </section>
}

export default withRouter(Landing)