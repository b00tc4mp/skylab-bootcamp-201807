import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import ChangePassword from '../components/ChangePassword';

class ChangePasswordPage extends Component {

  // goToLogin = (event) => {
  //   event.preventDefault()
  //   this.props.history.push('/login')
  // }

  state = {
    user: null
  }

  componentDidMount() {
    const { loggedInUsername, token } = this.props

    logic.retrieveUser(loggedInUsername, undefined, token)
      .then(user => {
        this.setState({ user })
      })
      .catch(err => console.log(err))
  }

  handleChangePasswordSubmit = (password, newPassword) => {
    const { loggedInUsername, token } = this.props

    logic.updateUserPassword(loggedInUsername, password, newPassword, token)
      .then(() => console.log('password actualizado!!!'))
      .catch(error => {
        console.log(error);
      })
  }

  goToEditProfile = event => {
    event.preventDefault()
    this.props.history.push('/accounts/edit')
  }

  render() {
    const { user } = this.state
    return (
      <div>
        <div>
          <a href="#/" onClick={this.goToEditProfile}>Edit profile</a>
        </div>
        <div>
          <h2>Change password</h2>
          {this.state.user && (
            <div>
              <img src={user.imageUrl} alt="" />
              <div>{user.username}</div>
              <ChangePassword onSubmit={this.handleChangePasswordSubmit} />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(ChangePasswordPage)