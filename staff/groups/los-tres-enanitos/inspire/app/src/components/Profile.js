import React, { Component } from 'react'

class Profile extends Component {

  handleClickEdit = event => {
    event.preventDefault()

    this.props.onClickEdit()
  }

  render() {
    return (
      <div className="profile">
        <div className="profile__photo-container">
          <img className="profile__photo" src="images/icono-user.png" alt="Profile picture" title={`${this.props.firstName} ${this.props.lastName}`} />
        </div>
        <div className="profile__details">
          <div className="profile__details-flex">
            <h1 className="profile__details-name">{this.props.firstName} {this.props.lastName}</h1>
            <div>
              <a href="#/" onClick={this.handleClickEdit} className="profile__details-edit">Edit profile</a>
            </div>
          </div>
          <div className="profile__details-description">{this.props.description}</div>
        </div>
      </div>
    )
  }
}

export default Profile