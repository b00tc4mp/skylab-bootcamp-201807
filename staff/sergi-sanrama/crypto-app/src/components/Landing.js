import React from 'react'
import Login from './Login'
import Register from './Register'

function Landing() {
    return <div>
    <p>LANDING PAGE</p>
    <nav>
        <li>
            <a href="/#/user/register">Register</a>
        </li>
        <li>
           <a href="/#/user/authenticate">Login</a>
        </li>
        {/* <Login />
        <Register /> */}
    </nav>
   </div>
}

export default Landing