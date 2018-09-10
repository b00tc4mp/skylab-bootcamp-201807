import React, { Component } from 'react'
import './GridPost.sass'

class GridPost extends Component {

  handlePostDetailClick = event => {
    event.preventDefault()
    this.props.onPostDetailClick(this.props.post._id)
  }

  render() {
    const { post } = this.props
    return (
      <div className="GridPost">
        {/* <div style={{ marginBottom: '50px' }}>
          <div>
            <img src={post.user.imageUrl} width="60" alt="" /> {post.user.username}
          </div>
          <img src={post.imageUrl} alt="" width="250" />
          <div>{post.caption}</div>
          <a href="#/" onClick={this.handlePostDetailClick}>Show detail</a>
        </div> */}
        <section className="GridPost-header">
          <div className="GridPost-avatarImageWrapper">
            <img src={post.user.imageUrl} className="GridPost-avatarImage" alt={post.user.username} />
          </div>
          <div className="GridPost-headerInfo">
            <h5 className="GridPost-username">{post.user.username}</h5>
            <span className="GridPost-location">Barcelona, Spain</span>
          </div>
        </section>
        <section className="GridPost-imageWrapper">
          <img src={post.imageUrl} className="GridPost-image" alt={post.caption} />
        </section>
        <section className="GridPost-body">
          <div className="GridPost-actions">
            <div className="GridPost-leftActions">
              <a href="#/" className="GridPost-actionIconLink">
                <i className="GridPost-actionIcon far fa-heart"></i>
              </a>
              <a href="#/" className="GridPost-actionIconLink">
                <i className="GridPost-actionIcon far fa-comment"></i>
              </a>
            </div>
            <div className="GridPost-rightActions">
              <a href="#/" className="GridPost-actionIconLink">
                <i className="GridPost-actionIcon far fa-bookmark"></i>
              </a>
            </div>
          </div>
          <span className="GridPost-numLikes">2 likes</span>
          <div className="GridPost-caption">
            <span className="GridPost-captionUsername">{post.user.username}</span> {post.caption}
          </div>
          <div className="GridPost-comments">
            <div className="GridPost-comment">
              <span className="GridPost-commentUsername">steve_jobs</span> Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
            <div className="GridPost-comment">
              <span className="GridPost-commentUsername">giodelabarrera</span> 😎😏 Lorem ipsum dolor sit amet consectetur 💤😴 adipisicing elit.
            </div>
            <div className="GridPost-comment">
              <span className="GridPost-commentUsername">steve_jobs</span> Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </div>
          <time className="GridPost-creation">1 Hour ago</time>
          <div className="GridPost-addComment">
            <form>
              <textarea name="" className="GridPost-addCommentTextarea" id="" cols="30" rows="10" placeholder="Add comment"></textarea>
            </form>
          </div>
        </section>
      </div>
    )
  }
}

export default GridPost