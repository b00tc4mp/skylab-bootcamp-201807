import React from 'react'
import PostListItem from './PostListItem'

const PostList = (props) => {
  return (
    <div>
      <h2>Posts</h2>
      {
        props.posts.map(post => {
          return (
            <PostListItem
              key={post._id}
              post={post}
              onPostClick={props.onPostClick}
            />
          )
        })
      }
    </div>
  )
}

export default PostList