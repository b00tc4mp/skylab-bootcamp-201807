import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

class Profile extends Component{
    state = {
        password: '',
        newpassword: '',
        error: ''
      }
    
      onPasswordChanged = e => this.setState({ password: e.target.value })
      
      onNewPasswordChanged = e => this.setState({ newpassword: e.target.value })
    
      onLoginSubmitted = e => {
        e.preventDefault()
    
        const { password, newpassword } = this.state
    
        // logic.authenticate(username, password)
        //   .then(token => this.props.onLoggedIn(username, token))
        //   .catch(({ message }) => this.setState({ error: message }))
      }
    
      render() {
        const { error } = this.state
    
        return <main>
          <div className="screen">
            <nav>
              &gt; <a href="/#/Files">Go Back</a><span className="blink">_</span>
            </nav>
            <form onSubmit={this.onLoginSubmitted}>
              <input type="password" name="password" placeholder="password" onChange={this.onPasswordChanged} />
              <input type="newpassword" name="newpassword" placeholder="newpassword" onChange={this.onPasswordChanged} />
              <button type="submit">¡Change it!</button>
            </form>
            {error && <p>{error}</p>}
          </div>
        </main>
      }
}


export default Profile