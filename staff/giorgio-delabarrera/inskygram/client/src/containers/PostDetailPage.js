import React, { Component } from 'react'
import logic from '../logic'
import { withRouter } from 'react-router-dom'
import Header from '../components/Header';
import PostDetail from '../components/PostDetail';

class PostDetailPage extends Component {

  state = {
    user: null,
    post: null,
  }

  async componentDidMount() {
    const { postId, loggedInUsername, token } = this.props

    try {
      const user = await logic.retrieveUser(loggedInUsername, undefined, token)

      this.setState({ user })

      const post = await logic.retrievePost(postId, loggedInUsername, token)

      this.setState({ post })
    } catch (err) {
      // TODO
    }
  }

  onToggleLikeClick = async (postId) => {
    const { loggedInUsername, token } = this.props

    try {
      await logic.toggleLikePost(token, loggedInUsername, postId)

      const postUpdated = await logic.retrievePost(postId, loggedInUsername, token)

      this.setState({ post: postUpdated })

    } catch (err) {
      // TODO
    }
  }

  onToggleSaveClick = async (postId) => {
    const { loggedInUsername, token } = this.props
    try {
      await logic.toggleSavePost(token, loggedInUsername, postId)
    } catch (err) {
      // TODO
    }
  }

  onAddCommentSubmit = async (postId, description) => {
    const { loggedInUsername, token } = this.props

    try {
      await logic.addCommentToPost(token, loggedInUsername, postId, description)

      const postUpdated = await logic.retrievePost(postId, loggedInUsername, token)

      this.setState({ post: postUpdated })

    } catch (err) {
      // TODO
    }
  }

  isLiked = likes => likes.find(like => like.user.username === this.props.loggedInUsername) ? true : false

  isSaved = (post, savedPosts) => savedPosts.find(savedPost => savedPost.post === post._id) ? true : false

  onUserClick = username => this.props.history.push(`/${username}`)

  onLoginClick = () => this.props.history.push('/accounts/login')

  onRegisterClick = () => this.props.history.push('/accounts/register')

  render() {
    return (
      <div>
        <div className="header-wrapper">
          <Header
            onHomeClick={this.props.onHomeClick}
            onExploreClick={this.props.onExploreClick}
            onNewPostClick={this.props.onNewPostClick}
            onProfileClick={this.props.onProfileClick}
            onSearch={this.props.onSearch}
            onSearchResultClick={this.props.onSearchResultClick}
            isLoggedIn={this.props.loggedInUsername ? true : false}
            onLoginClick={this.onLoginClick}
            onRegisterClick={this.onRegisterClick}
          />
        </div>
        <div className="main-wrapper">
          <main>
            {
              this.state.post && (
                <PostDetail
                  post={this.state.post}
                  onUserClick={this.onUserClick}
                  onToggleLikeClick={this.onToggleLikeClick}
                  onToggleSaveClick={this.onToggleSaveClick}
                  onAddCommentSubmit={this.onAddCommentSubmit}
                  isLiked={this.isLiked(this.state.post.likes)}
                  isSaved={this.isSaved(this.state.post, this.state.user.savedPosts)}
                />
              )
            }
          </main>
        </div>
      </div>
    )
  }
}

export default withRouter(PostDetailPage)