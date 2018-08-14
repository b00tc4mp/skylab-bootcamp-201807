import React, { Component } from 'react'

class Login extends Component {
    render() {
        return <main>
        <div className="screen">
          <nav>
            &gt; <a href="/#/register">register</a> or login <span className="blink">_</span>
          </nav>
          <form action="/login" method="post">
            <input
              type="text"
              name="username"
              placeholder="username"
              autofocus
            />
            <input type="password" name="password" placeholder="password" />
            <button type="submit">login</button>
          </form>
        </div>
      </main>
    }
}

export default Login