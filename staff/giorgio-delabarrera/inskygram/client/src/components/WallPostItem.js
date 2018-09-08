import React, { Component } from 'react'

class WallPostItem extends Component {

  handlePostDetailClick = event => {
    event.preventDefault()
    this.props.onPostDetailClick(this.props.post._id)
  }

  render() {
    const { post } = this.props
    return (
      <div style={{ marginBottom: '50px' }}>
        <div>
          <img src={post.user.imageUrl} width="60" alt="" /> {post.user.username}
        </div>
        <img src={post.imageUrl} alt="" width="250" />
        <div>{post.caption}</div>
        <a href="#/" onClick={this.handlePostDetailClick}>Show detail</a>
      </div>
    )
  }
}

export default WallPostItem