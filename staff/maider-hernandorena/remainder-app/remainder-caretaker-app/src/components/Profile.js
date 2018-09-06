import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'

class Profile extends Component{

  state = {
    password: "",
    newPassword: "",
    updateError : "",
    updated: ""
  }

  keepPassword = e => this.setState({ password: e.target.value, updateError: '', updated: '' })
  keepNewPassword = e => this.checkPassword(e.target.value) 

  checkPassword = value => {
    const regex = (/^[a-zA-Z0-9]+$/)
    let regexOk = value.match(regex)

    if (regexOk !== null ) this.setState({ newPassword: value, updateError: '', updated: '' })    
  }

  onUpdate = e => {
    e.preventDefault()
    const { password, newPassword } = this.state
    const { email, token } = this.props
    logic.updateCaretakerPassword(email, password, newPassword, token)
      .then( message => this.setState({ updated: message, updateError: '' }))
      .catch(({ message }) => this.setState({ updateError: message, updated: '' }))
  }

  onUnregister = e => {
    e.preventDefault()
    this.props.onUnregister(this.state.password)
  }

  render(){
    const { state: { updateError, updated }, keepPassword, keepNewPassword, onUpdate, onUnregister} = this
    return <main>
            <div>
              <nav>
                <p>Update your Password</p>
              </nav>
              <form onSubmit={onUpdate}>
                <input type="text" name="email" placeholder="email" readOnly value={this.props.email} />
                <input type="password" name="password" placeholder="password" onChange={keepPassword} />
                <input type="password" name="newPassword" placeholder="New password" onChange={keepNewPassword} />
                <button type="submit">Update</button>
              </form>
              {updateError && <p className="error">{updateError}</p>}
              {updated && <p className="okey">Okey! {updated}. Now you can continue navigating on <a href="/#/home">home</a></p>}
            </div>
            <div>
              <nav>
                <p>Delete your account</p>
              </nav>
              <form onSubmit={onUnregister}>
                <input type="text" name="email" placeholder="email" readOnly value={this.props.email} />
                <input type="password" name="password" placeholder="password" onChange={keepPassword} />
                <button type="submit">Unregister</button>
              </form>
              {this.props.unregisterError && <p className="error">{this.props.unregisterError}</p>}
            </div>
          </main>
  }
  
  
}

export default withRouter(Profile)