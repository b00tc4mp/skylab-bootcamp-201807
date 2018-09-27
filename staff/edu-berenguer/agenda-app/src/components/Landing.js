import React from 'react'

function Landing() {
    return <div class="menu-landing">
    {/* <nav>
        <li>
            <a href="/#/register">Register</a>
        </li>
        <li>
           <a href="/#/login">Login</a>
        </li>
    </nav>
    <h1>AGENDA</h1> */}

    <nav>
    <h1>AGENDA</h1>
        
            <a href="/#/register" class="button is-large">Register</a>
            <label> or </label>
            <a href="/#/login" class="button is-large ">Login</a>
        
    </nav>
</div>
}

export default Landing