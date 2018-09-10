import React, { Component } from 'react'
import './Profile.sass'

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
      // <section className="Profile">
      //   {this.props.editProfile && (
      //     <a href="#/" onClick={this.handleEditClick}>Edit profile</a>
      //   )}
      //   <img src={user.imageUrl} alt="" />
      //   <div><strong>{user.username}</strong></div>

      //   {/* <div>{numberPosts} posts</div> */}
      //   <div>{user.followers.length} followers</div>
      //   <div>{user.followings.length} followings</div>

      //   <div>{user.name}</div>
      //   <div>{user.website}</div>
      //   <div>{user.biography}</div>
      // </section>
      <section className="Profile">
        <div className="Profile-avatarWrapper">
          <img src={user.imageUrl} className="Profile-avatarImage" alt={user.username} />
        </div>
        <div className="Profile-detailWrapper">
          <div className="Profile-detailHeader">
            <h1 className="Profile-username">{user.username}</h1>
            <div className="Profile-actions">
              <button className="Profile-button button">Edit profile</button>
              {/* <button className="Profile-button button is-primary">Follow</button> */}
            </div>
          </div>
          <div className="Profile-counters">
            <div className="Profile-counter">
              <strong>5</strong> posts
            </div>
            <div className="Profile-counter">
              <strong>{user.followers.length}</strong> followers
            </div>
            <div className="Profile-counter">
              <strong>{user.followings.length}</strong> followings
            </div>
          </div>
          <h2 className="Profile-name">{user.name}</h2>
          <div className="Profile-biography">{user.biography} Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
          <div className="Profile-website">{user.website}</div>
        </div>
      </section>
    )
  }
}

export default Profile