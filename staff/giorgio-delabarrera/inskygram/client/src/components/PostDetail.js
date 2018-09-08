import React, { Component } from 'react'

class PostDetail extends Component {

  render() {
    const { post } = this.props

    return (
      <div>
        <img src={post.imageUrl} alt="" width="250" />
        <div>{post.caption}</div>
      </div>
    )
  }
}

export default PostDetail