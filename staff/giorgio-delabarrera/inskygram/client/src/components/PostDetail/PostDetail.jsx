import React, { Component } from 'react'
import './PostDetail.sass'

class PostDetail extends Component {

  render() {
    const { post } = this.props

    return (
      // <div>
      //   <img src={post.imageUrl} alt="" width="250" />
      //   <div>{post.caption}</div>
      // </div>
      <section className="PostDetail">
        <section className="PostDetail-imageWrapper">
          <img src={post.imageUrl} className="PostDetail-image" alt={post.caption} />
        </section>
        <section className="PostDetail-body">
          <div className="PostDetail-bodyTop">
            <div className="PostDetail-header">
              <div className="PostDetail-avatarImageWrapper">
                <img src={post.user.imageUrl} className="PostDetail-avatarImage" alt={post.user.username} />
              </div>
              <div className="PostDetail-headerInfo">
                <h5 className="PostDetail-username">{post.user.username}</h5>
                <span className="PostDetail-location">Barcelona, Spain</span>
              </div>
            </div>
            <div className="PostDetail-commentsWrapper">
              <div className="PostDetail-caption">
                <span className="PostDetail-captionUsername">{post.user.username}</span> {post.caption}
              </div>
              <div className="PostDetail-comments">
                <div className="PostDetail-comment">
                  <span className="PostDetail-commentUsername">steve_jobs</span> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
                <div className="PostDetail-comment">
                  <span className="PostDetail-commentUsername">giodelabarrera</span> 😎😏 Lorem ipsum dolor sit amet consectetur 💤😴 adipisicing elit.
                </div>
                <div className="PostDetail-comment">
                  <span className="PostDetail-commentUsername">steve_jobs</span> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
                <div className="PostDetail-comment">
                  <span className="PostDetail-commentUsername">steve_jobs</span> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
                <div className="PostDetail-comment">
                  <span className="PostDetail-commentUsername">steve_jobs</span> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
                <div className="PostDetail-comment">
                  <span className="PostDetail-commentUsername">steve_jobs</span> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
                <div className="PostDetail-comment">
                  <span className="PostDetail-commentUsername">steve_jobs</span> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
              </div>
            </div>
          </div>
          <div className="PostDetail-bodyBottom">
            <div className="PostDetail-actions">
              <div className="PostDetail-leftActions">
                <a href="#/" className="PostDetail-actionIconLink">
                  <i className="PostDetail-actionIcon far fa-heart"></i>
                </a>
                <a href="#/" className="PostDetail-actionIconLink">
                  <i className="PostDetail-actionIcon far fa-comment"></i>
                </a>
              </div>
              <div className="PostDetail-rightActions">
                <a href="#/" className="PostDetail-actionIconLink">
                  <i className="PostDetail-actionIcon far fa-bookmark"></i>
                </a>
              </div>
            </div>
            <span className="PostDetail-numLikes">2 likes</span>
            <time className="PostDetail-creation">1 Hour ago</time>
            <div className="PostDetail-addComment">
              <form>
                <textarea name="" className="PostDetail-addCommentTextarea" id="" cols="30" rows="10" placeholder="Add comment"></textarea>
              </form>
            </div>
          </div>
        </section>
      </section>
    )
  }
}

export default PostDetail