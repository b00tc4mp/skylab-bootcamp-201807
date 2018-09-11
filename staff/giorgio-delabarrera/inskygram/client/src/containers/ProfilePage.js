import React, { Component } from 'react'
import logic from '../logic'
import { withRouter } from 'react-router-dom'
import Header from '../components/Header';
import Profile from '../components/Profile';
import GridPost from '../components/GridPost';

class ProfilePage extends Component {

  state = {
    user: null,
    posts: [],
    isForbidden: true
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
      .then(user => this.setState({ user }))
      .then(() => {
        if (loggedInUsername) {
          if (loggedInUsername === username) {
            this.setState({ isForbidden: false })

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
        this.setState({ posts })
      })
      .catch(({ message }) => console.log(message))
  }

  goToEditProfile = () => {
    this.props.history.push(`/accounts/edit`)
  }

  // handlePostClick = postId => {
  //   // console.log(postId)
  //   // this.props.history.push(`/photos/${photoId}`)
  // }

  render() {
    const { username, loggedInUsername } = this.props

    return (

      <div>
        <div className="header-wrapper">
          <Header onNewPostClick={this.props.onNewPostClick} />
        </div>
        <div className="main-wrapper">
          <main>
            {
              this.state.user && this.state.posts && (
                <Profile
                  user={this.state.user}
                  editProfile={loggedInUsername === username}
                  onEditClick={this.goToEditProfile}
                />
              )
            }
            <section className="profile-posts-wrapper">
              <div className="tabs-wrapper">
                <ul className="Tabs">
                  <li className="Tabs-item">
                    <a href="#/" className="Tabs-itemLink is-active">
                      <i className="fas fa-th"></i> Posts
                    </a>
                  </li>
                  <li className="Tabs-item">
                    <a href="#/" className="Tabs-itemLink">
                      <i className="far fa-bookmark"></i> Saved
                    </a>
                  </li>
                </ul>
              </div>
              <div className="is-one-thirds grid-gap-30">
                {this.state.isForbidden ? (
                  <div>This Account is Private</div>
                ) : (
                    this.state.posts && this.state.posts.map((post) =>
                      (
                        <GridPost
                          key={post._id}
                          post={post}
                          onPostDetailClick={this.props.onPostDetailClick}
                        />
                      )
                    )
                  )}
              </div>
            </section>
          </main>
        </div>
      </div>
    )
  }
}

export default withRouter(ProfilePage)