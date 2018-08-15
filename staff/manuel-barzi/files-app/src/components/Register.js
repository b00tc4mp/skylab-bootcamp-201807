import React, { Component } from 'react'

class Register extends Component {
    render() {
        return <main>
            <div className="screen">
                <nav>
                    &gt; register or <a href="/#/login">login</a> <span className="blink">_</span>
                </nav>
                <form action="/register" method="post">
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        autofocus
                    />
                    <input type="password" name="password" placeholder="password" />
                    <button type="submit">register</button>
                </form>
            </div>
        </main>
    }
}

export default Register