import React, { Component } from 'react'
import Profile from '../components/Profile';
import logic from '../logic'
import PostList from '../components/PostList';
import { withRouter } from 'react-router-dom'

class ProfilePage extends Component {

  state = {
    user: null,
    posts: []
  }

  componentDidMount() {
    const { username, loggedInUsername, token } = this.props

    Promise.resolve()
      .then(() => {
        if (loggedInUsername) {
          if (loggedInUsername === username) {
            return logic.retrieveUser(username, undefined, token)
          } else {
            const targetUsername = username
            return logic.retrieveUser(loggedInUsername, targetUsername, token)
          }
        }
        else {
          const targetUsername = username
          return logic.retrieveUser(undefined, targetUsername)
        }
      })
      .then(user => {
        this.setState({ user })
      })
      .then(() => {
        if (loggedInUsername) {
          if (loggedInUsername === username) {
            return logic.listUserPosts(username, undefined, token)
          } else {
            const targetUsername = username
            return logic.listUserPosts(loggedInUsername, targetUsername, token)
          }
        }
        else {
          const targetUsername = username
          return logic.listUserPosts(undefined, targetUsername)
        }
      })
      .then(posts => {
        // console.log(posts)
        this.setState({ posts })
      })
      .catch(err => console.log(err))
  }

  goToEditProfile = () => {
    this.props.history.push(`/accounts/edit`)
  }

  handlePostClick = postId => {
    // console.log(postId)
    // this.props.history.push(`/photos/${photoId}`)
  }

  render() {
    const { username, loggedInUsername } = this.props
    return (
      <div>
        <div>
          {
            this.state.user && (
              <Profile
                user={this.state.user}
                editProfile={loggedInUsername === username}
                onEditClick={this.goToEditProfile}
              />
            )
          }
        </div>
        <div>
          {this.state.posts && (
            <PostList
              posts={this.state.posts}
              onPostClick={this.handlePostClick}
            />
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(ProfilePage)