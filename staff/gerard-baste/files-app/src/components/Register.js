import React, { Component } from 'react'
import logic from '../logic'
import { withRouter } from 'react-router-dom'


class Register extends Component {

  state = {
    username: "",
    password: ""
  }

  keepUser = event => this.setState({username:event.target.value})

  keepPassword = event => this.setState({password:event.target.value})

  onRegister = (event) =>{
      event.preventDefault()
      const { username, password } = this.state
      this.props.onRegister(username,password)
  }

  goToLogin = (event) => {
    event.preventDefault()
    this.props.history.push('/Login')
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
                        >  register or <a href="" onClick={this.goToLogin}>login</a> <span className="blink">_</span>
                    </nav>
                    {/* <form action="/register" method="post"> */}
                    <form onSubmit={this.onRegister}>
                        <input type="text" name="username" placeholder="username" onChange={this.keepUser}/>
                        <input type="password" name="password" placeholder="password" onChange={this.keepPassword}/>
                        <button type="submit">register</button>
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

export default withRouter(Register)