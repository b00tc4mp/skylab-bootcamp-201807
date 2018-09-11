import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import Header from '../components/Header';
import Avatar from '../components/Avatar/Avatar';
import ColumnPostList from '../components/ColumnPostList';

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
          <main className="is-eight-quarters grid-gap-30">
            <section>
              {<ColumnPostList
                posts={this.state.posts}
                onPostDetailClick={this.props.onPostDetailClick}
                onUserClick={this.onUserClick}
              />}
            </section>
            <section>
              {this.state.user && <Avatar
                username={this.state.user.username}
                name={this.state.user.name}
                imageUrl={this.state.user.imageUrl}
                onUserClick={this.onUserClick}
              />}
            </section>
          </main>
        </div>
      </div>
    )
  }
}

export default withRouter(WallPage)