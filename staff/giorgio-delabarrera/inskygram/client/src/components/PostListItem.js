import React, { Component } from 'react'

class PostListItem extends Component {

  // handleClick = () => {
  //   this.props.onPhotoClick(this.props.id)
  // }

  render() {
    // console.log(this.props.post)
    const { post } = this.props
    return (
      <div>
        <img src={post.imageUrl} alt="" width="250" />
        <div>{post.caption}</div>
      </div>
    )
  }
}

export default PostListItem