import React, { Component } from 'react'
import Profile from '../components/Profile';
import Header from '../components/Header';
import logic from '../logic'

class ProfilePage extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    logic.retrieveUserById(this.props.id)
      .then(user => {
        this.setState({ user })
      })
  }

  render() {
    return (
      <div>
        <Header />
        <main>
          <section className="profile-container">
            {
              this.state.user &&
              <Profile
                id={this.state.user.id}
                firstName={this.state.user.firstName}
                lastName={this.state.user.lastName}
                description={this.state.user.description}
              />
            }
          </section>
        </main>
      </div>
    )
  }
}

export default ProfilePage