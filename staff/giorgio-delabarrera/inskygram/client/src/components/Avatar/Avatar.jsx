import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './Avatar.sass'

// TODO: define env variables
const DEFAULT_AVATAR = 'https://cdn.vox-cdn.com/images/verge/default-avatar.v989902574302a6378709709f7baab789b242ebbb.gif'

class Avatar extends Component {

  handleUserClick = event => {
    event.preventDefault()

    this.props.onUserClick(this.props.username)
  }

  render() {
    const { username, name, imageUrl } = this.props

    return (
      <div className="Avatar">
        <div className="Avatar-imageWrapper">
          <a href="#/" onClick={this.handleUserClick}>
            <img src={imageUrl ? imageUrl : DEFAULT_AVATAR}
              className="Avatar-image"
              alt={username}
              title={username}
            />
          </a>
        </div>
        <div className="Avatar-user">
          <h5 className="Avatar-username">
            <a href="#/" className="Avatar-usernameLink" onClick={this.handleUserClick}>{username}</a>
          </h5>
          <h5 className="Avatar-name">{name}</h5>
        </div>
      </div>
    )
  }
}

export default withRouter(Avatar)