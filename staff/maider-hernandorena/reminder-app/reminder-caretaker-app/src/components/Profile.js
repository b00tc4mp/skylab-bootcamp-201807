import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import '../styles/css/profile.css'

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
    return <main className="profile">
              <h2 className="profile__title">Update Password</h2>
              <form className="profile__form" onSubmit={onUpdate}>
                <input className="profile__form__inputReadOnly" type="text" name="dni" placeholder="dni" readOnly value={this.props.dni} />
                <input className="profile__form__input" type="password" name="password" placeholder="password" onChange={keepPassword} />
                <input className="profile__form__input" type="password" name="newPassword" placeholder="new password" onChange={keepNewPassword} />
                <button className="profile__form__button" type="submit">Update</button>
              </form>
              {updateError && <p className="profile__error">{updateError}</p>}
              {updated && <p className="profile__added">Okey! {updated}. Now you can continue navigating on <a className="profile__added__link" href="/#/home">home</a></p>}
          </main>
  }
  
}

export default withRouter(Profile)