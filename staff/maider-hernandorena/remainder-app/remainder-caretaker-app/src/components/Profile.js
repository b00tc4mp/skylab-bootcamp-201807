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
    let { dni, id, token } = this.props
    dni = parseInt(dni)

    logic.updateCaretakerPassword(dni, password, newPassword, id, token)
      .then( message => this.setState({ updated: message, updateError: '' }))
      .catch(({ message }) => this.setState({ updateError: message, updated: '' }))
  }

  render(){
    const { state: { updateError, updated }, keepPassword, keepNewPassword, onUpdate } = this
    return <main>
            <div>
              <nav>
                <p>Update your Password</p>
              </nav>
              <form onSubmit={onUpdate}>
                <input type="text" name="dni" placeholder="dni" readOnly value={this.props.dni} />
                <input type="password" name="password" placeholder="password" onChange={keepPassword} />
                <input type="password" name="newPassword" placeholder="New password" onChange={keepNewPassword} />
                <button type="submit">Update</button>
              </form>
              {updateError && <p className="error">{updateError}</p>}
              {updated && <p className="okey">Okey! {updated}. Now you can continue navigating on <a href="/#/home">home</a></p>}
            </div>
          </main>
  }
  
  
}

export default withRouter(Profile)