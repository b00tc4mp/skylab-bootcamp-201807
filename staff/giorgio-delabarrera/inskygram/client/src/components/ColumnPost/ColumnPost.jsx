import React, { Component } from 'react'
import './ColumnPost.sass'

class ColumnPost extends Component {

  handlePostDetailClick = event => {
    event.preventDefault()

    this.props.onPostDetailClick(this.props.post._id)
  }

  render() {
    const { post } = this.props
    return (
      <div className="ColumnPost">
        <section className="ColumnPost-header">
          <div className="ColumnPost-avatarImageWrapper">
            <img src={post.user.imageUrl} className="ColumnPost-avatarImage" alt={post.user.username} />
          </div>
          <div className="ColumnPost-headerInfo">
            <h5 className="ColumnPost-username">{post.user.username}</h5>
            <span className="ColumnPost-location">Barcelona, Spain</span>
          </div>
        </section>
        <section className="ColumnPost-imageWrapper">
          {/* <a href="#/" onClick={this.handlePostDetailClick}> */}
          <img src={post.imageUrl} className="ColumnPost-image" alt={post.caption} />
          {/* </a> */}
        </section>
        <section className="ColumnPost-body">
          <div className="ColumnPost-actions">
            <div className="ColumnPost-leftActions">
              <a href="#/" className="ColumnPost-actionIconLink">
                <i className="ColumnPost-actionIcon far fa-heart"></i>
              </a>
              <a href="#/" className="ColumnPost-actionIconLink">
                <i className="ColumnPost-actionIcon far fa-comment"></i>
              </a>
            </div>
            <div className="ColumnPost-rightActions">
              <a href="#/" className="ColumnPost-actionIconLink">
                <i className="ColumnPost-actionIcon far fa-bookmark"></i>
              </a>
            </div>
          </div>
          <span className="ColumnPost-numLikes">2 likes</span>
          <div className="ColumnPost-caption">
            <span className="ColumnPost-captionUsername">{post.user.username}</span> {post.caption}
          </div>
          <div className="ColumnPost-comments">
            <div className="ColumnPost-comment">
              <span className="ColumnPost-commentUsername">steve_jobs</span> Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
            <div className="ColumnPost-comment">
              <span className="ColumnPost-commentUsername">giodelabarrera</span> 😎😏 Lorem ipsum dolor sit amet consectetur 💤😴 adipisicing elit.
            </div>
            <div className="ColumnPost-comment">
              <span className="ColumnPost-commentUsername">steve_jobs</span> Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </div>
          <time className="ColumnPost-creation">1 Hour ago</time>
          <div className="ColumnPost-addComment">
            <form>
              <textarea name="" className="ColumnPost-addCommentTextarea" id="" cols="30" rows="10" placeholder="Add comment"></textarea>
            </form>
          </div>
        </section>
      </div>
    )
  }
}

export default ColumnPost