import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
// import ChangePassword from '../components/ChangePassword';
import Header from '../components/Header';
import ChangePassword from '../components/ChangePassword';
// import ChangePassword from '../components/ChangePassword';

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
      // <div>
      //   <div>
      //     <a href="#/" onClick={this.goToEditProfile}>Edit profile</a>
      //   </div>
      //   <div>
      //     <h2>Change password</h2>
      //     {this.state.user && (
      //       <div>
      //         <img src={user.imageUrl} alt="" />
      //         <div>{user.username}</div>
      //         <ChangePassword onSubmit={this.handleChangePasswordSubmit} />
      //       </div>
      //     )}
      //   </div>
      // </div>
      <div>
        <div className="header-wrapper">
          <Header
            onHomeClick={this.props.onHomeClick}
            onExploreClick={this.props.onExploreClick}
            onNewPostClick={this.props.onNewPostClick}
            onProfileClick={this.props.onProfileClick}
          />
        </div>
        <div className="main-wrapper">
          <main>
            <section className="edit-profile-wrapper">
              <div className="edit-profile-menu-container">
                <ul className="Menu">
                  <li className="Menu-item">
                    <a href="#/" className="Menu-itemLink">Edit profile</a>
                  </li>
                  <li className="Menu-item">
                    <a href="#/" className="Menu-itemLink is-active">Change password</a>
                  </li>
                </ul>
              </div>
              <div className="edit-profile-container">
                <div>
                  {user && <ChangePassword onSubmit={this.handleChangePasswordSubmit} />}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    )
  }
}

export default withRouter(ChangePasswordPage)