import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import Header from '../components/Header';
import GridPostList from '../components/GridPostList';

class ExplorePage extends Component {

  state = {
    user: null,
    posts: [],
  }

  componentDidMount() {
    const { loggedInUsername, token } = this.props

    logic.retrieveUser(loggedInUsername, undefined, token)
      .then(user => this.setState({ user }))
      .then(() => logic.listExplorePosts(token, loggedInUsername))
      .then(newPosts => {
        const posts = [...this.state.posts, ...newPosts]
        this.setState({ posts })
      })
      // TODO
      .catch(err => false)
  }

  onUserClick = username => this.props.history.push(`/${username}`)

  render() {
    return (
      <div>
        <div className="header-wrapper">
          <Header
            onHomeClick={this.props.onHomeClick}
            onExploreClick={this.props.onExploreClick}
            onNewPostClick={this.props.onNewPostClick}
            onProfileClick={this.props.onProfileClick}
          />
        </div>
        <div className="main-wrapper">
          <main>
            <h5 className="has-text-gray">Explore</h5>
            {<GridPostList
              posts={this.state.posts}
              onPostDetailClick={this.props.onPostDetailClick}
              onUserClick={this.onUserClick}
            />}
          </main>
        </div>
      </div>
    )
  }
}

export default withRouter(ExplorePage)