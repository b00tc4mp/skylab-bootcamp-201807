import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import WallPostItem from '../components/WallPostItem';

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
    return (
      <div>
        {
          this.state.posts && this.state.posts.map((post) =>
            (
              <WallPostItem
                key={post._id}
                post={post}
                onPostDetailClick={this.handlePostDetailClick}
              />
            )
          )
        }
      </div>
    )
  }
}

export default withRouter(WallPage)