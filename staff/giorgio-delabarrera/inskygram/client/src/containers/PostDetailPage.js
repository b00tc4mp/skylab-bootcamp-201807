import React, { Component } from 'react'
import logic from '../logic'
import { withRouter } from 'react-router-dom'
import Header from '../components/Header';
import PostDetail from '../components/PostDetail';

class PostDetailPage extends Component {

  state = {
    post: null,
  }

  componentDidMount() {
    const { postId, loggedInUsername, token } = this.props

    logic.retrievePost(postId, loggedInUsername, token)
      .then(post => this.setState({ post }))
      .catch(err => console.log(err))
  }

  // goToEditProfile = () => {
  //   this.props.history.push(`/accounts/edit`)
  // }

  // handlePostClick = postId => {
  // console.log(postId)
  // this.props.history.push(`/photos/${photoId}`)
  // }

  render() {
    return (
      <div>
        <div className="header-wrapper">
          <Header />
        </div>
        <div className="main-wrapper">
          <main>
            {
              this.state.post && (
                <PostDetail
                  post={this.state.post}
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