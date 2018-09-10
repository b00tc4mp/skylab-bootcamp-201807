import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './Avatar.sass'

class Avatar extends Component {

  render() {
    const { username, name, imageUrl } = this.props

    return (
      <div className="Avatar">
        <div className="Avatar-imageWrapper">
          <img src={imageUrl}
            className="Avatar-image"
            alt={username}
            title={username}
          />
        </div>
        <div className="Avatar-user">
          <h5 className="Avatar-username">
            <a href="#/" className="Avatar-usernameLink">{username}</a>
          </h5>
          <h5 className="Avatar-name">{name}</h5>
        </div>
      </div>
    )
  }
}

export default withRouter(Avatar)