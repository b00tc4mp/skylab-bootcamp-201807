import React, { Component } from 'react'
import Header from '../components/Header';
import EditProfile from '../components/EditProfile';
import { withRouter } from 'react-router-dom'
import logic from '../logic'

class EditProfilePage extends Component {

  state = {
    user: null,
    updateSuccess: '',
    updateError: ''
  }

  componentDidMount() {
    logic.retrieveUserById(logic.userId)
      .then(user => {
        this.setState({ user })
      })
  }

  handleSubmit = (formData) => {

    const { passwordToUpdate: password, ...fields } = formData

    logic.updateUser(password, fields)
      .then(() => {
        this.setState({
          updateSuccess: `Your profile has been updated correctly.`,
          updateError: '',
        })
      })
      .catch(error => {
        this.setState({
          updateError: `Upps, ${error.message}`,
          updateSuccess: '',
        })
      })
  }

  render() {
    return (
      <div>
        <Header loggedIn={this.props.loggedIn} />
        <main>

          <div className="form-container content push-40-t">
            <div className="text-center push-20">
              <ul className="tabs">
                <li className="tabs__item">
                  <a href="#/" className="tabs__link tabs__link--active" onClick={(event) => event.preventDefault()}>Edit Profile</a>
                </li>
              </ul>
            </div>
            <div>
              {
                this.state.user && (
                  <EditProfile
                    user={this.state.user}
                    onSubmit={this.handleSubmit}
                    success={this.state.updateSuccess}
                    error={this.state.updateError}
                  />
                )
              }
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default withRouter(EditProfilePage)