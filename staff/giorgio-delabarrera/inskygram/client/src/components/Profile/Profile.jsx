import React, { Component } from 'react'
import './Profile.sass'

// TODO: define env variables
const DEFAULT_AVATAR = 'https://goo.gl/F65XTo'

class Profile extends Component {

  handleEditClick = event => {
    event.preventDefault()

    this.props.onEditProfileClick()
  }

  handleToggleFollowClick = event => {
    event.preventDefault()

    this.props.onToggleFollowClick()
  }

  _renderProfileActions = () => {
    if (this.props.isEdit) {
      return (
        <button
          className="Profile-button button"
          onClick={this.handleEditClick}
        >
          Edit profile
        </button>
      )
    } else {
      if (this.props.isFollowing) {
        return (
          <button
            className="Profile-button button"
            onClick={this.handleToggleFollowClick}
          >
            Following
          </button>
        )
      } else {
        return (
          <button
            className="Profile-button button is-primary"
            onClick={this.handleToggleFollowClick}
          >
            Follow
          </button>
        )
      }
    }
  }

  render() {
    const { user } = this.props
    return (
      <section className="Profile">
        <div className="Profile-avatarWrapper">
          <img
            src={user.imageUrl ? user.imageUrl : DEFAULT_AVATAR}
            className="Profile-avatarImage"
            alt={user.username}
          />
        </div>
        <div className="Profile-detailWrapper">
          <div className="Profile-detailHeader">
            <h1 className="Profile-username">{user.username}</h1>
            <div className="Profile-actions">
              {this._renderProfileActions()}
            </div>
          </div>
          <div className="Profile-counters">
            <div className="Profile-counter">
              <strong>?</strong> posts
            </div>
            <div className="Profile-counter">
              <strong>{user.followers.length}</strong> followers
            </div>
            <div className="Profile-counter">
              <strong>{user.followings.length}</strong> followings
            </div>
          </div>
          <h2 className="Profile-name">{user.name}</h2>
          <div className="Profile-biography">{user.biography}</div>
          {user.website && (
            <div className="Profile-website">
              <a href={user.website} target="_blank" className="Profile-websiteLink">{user.website}</a>
            </div>
          )}
        </div>
      </section>
    )
  }
}

export default Profile