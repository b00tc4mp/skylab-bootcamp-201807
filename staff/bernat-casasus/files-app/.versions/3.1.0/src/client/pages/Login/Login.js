import React from 'react'
import './Login.css'
const Login = () => {
    return (
        <main>
        <div class="screen">
            <nav>
                > <a href="/register">register</a> or login <span class="blink">_</span>
            </nav>
            <form action="/login" method="post">
                <input type="text" name="username" placeholder="username" autofocus/>
                <input type="password" name="password" placeholder="password"/>
                <button type="submit">login</button>
            </form>
        </div>
    </main>
    )
}

export default Login