import React, { Component } from 'react'

class Profile extends Component {

  // handleClickEdit = event => {
  //   event.preventDefault()

  //   this.props.onClickEdit()
  // }

  handleEditClick = event => {
    event.preventDefault()

    this.props.onEditClick()
  }

  render() {
    const { user } = this.props
    return (
      <div>
        <h2>Profile</h2>
        {this.props.editProfile && (
          <a href="#/" onClick={this.handleEditClick}>Edit profile</a>
        )}
        <img src={user.imageUrl} alt="" />
        <div><strong>{user.username}</strong></div>

        {/* <div>{numberPosts} posts</div> */}
        <div>{user.followers.length} followers</div>
        <div>{user.followings.length} followings</div>

        <div>{user.name}</div>
        <div>{user.website}</div>
        <div>{user.biography}</div>
      </div>
    )
  }
}

export default Profile