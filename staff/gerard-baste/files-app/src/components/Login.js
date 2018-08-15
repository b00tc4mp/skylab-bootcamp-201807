import React, { Component } from 'react'
import logic from '../logic'
import { withRouter } from 'react-router-dom'


class Login extends Component {

  state = {
        username: '',
        password: ''
  }

  keepUser = event => this.setState({username:event.target.value})

  keepPassword = event => this.setState({password:event.target.value})


    onLogin = (event) =>{
        event.preventDefault()
        const { username, password } = this.state
        this.props.onLogin(username,password)
    }

  goToRegister = (event) => {
    event.preventDefault()
    this.props.history.push('/Register')
  }

  render() {
    return (
        <div>
                <header>
            <h1 className="off">FILES</h1>
        </header>
        <main>
            <div className="screen">
                <nav>
                    > <a href="" onClick={this.goToRegister}>register</a> or login <span className="blink">_</span>
                </nav>
                {/* <form action="/login" method="post"> */}
                <form onSubmit={this.onLogin}>
                    <input type="text" name="username" placeholder="username" onChange={this.keepUser}/>
                    <input type="password" name="password" placeholder="password" onChange={this.keepPassword}/>
                    <button type="submit">login</button>
                </form>
            </div>
        </main>
        <footer>
            <span className="power on">&#x23FB;</span>
        </footer>
        </div>
    )
  }
}

export default withRouter(Login)