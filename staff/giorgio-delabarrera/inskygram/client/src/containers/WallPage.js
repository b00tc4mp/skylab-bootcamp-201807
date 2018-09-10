import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import Header from '../components/Header';
import Avatar from '../components/Avatar/Avatar';
import ColumnPost from '../components/ColumnPost';

class WallPage extends Component {

  state = {
    user: null,
    posts: [],
  }

  componentDidMount() {
    const { loggedInUsername, token } = this.props

    logic.retrieveUser(loggedInUsername, undefined, token)
      .then(user => this.setState({ user }))
      .then(() => logic.listUserWall(token, loggedInUsername))
      .then(newPosts => {
        const posts = [...this.state.posts, ...newPosts]
        this.setState({ posts })
      })
      .catch(err => console.log(err))
  }

  handlePostDetailClick = postId => {
    this.props.history.push(`/p/${postId}`)
  }

  render() {
    const { user } = this.state
    return (
      <div>
        <div className="header-wrapper">
          <Header />
        </div>
        <div className="main-wrapper">
          <main className="is-eight-quarters grid-gap-30">
            <section>
              {
                this.state.posts && this.state.posts.map((post) =>
                  (
                    <ColumnPost
                      key={post._id}
                      post={post}
                      onPostDetailClick={this.handlePostDetailClick}
                    />
                  )
                )
              }
            </section>
            <section>
              {user && <Avatar
                username={user.username}
                name={user.name}
                imageUrl={user.imageUrl}
              />}
            </section>
          </main>
        </div>
      </div>
    )
  }
}

export default withRouter(WallPage)