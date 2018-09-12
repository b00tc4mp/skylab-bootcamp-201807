import React from 'react'
import ColumnPost from './ColumnPost';

const ColumnPostList = props => {

  if (props.posts.length > 0) {
    return props.posts.map(post =>
      (<ColumnPost
        key={post._id}
        post={post}
        onPostDetailClick={props.onPostDetailClick}
        onUserClick={props.onUserClick}
        onToggleLikeClick={props.onToggleLikeClick}
        onToggleSaveClick={props.onToggleSaveClick}
        onAddCommentSubmit={props.onAddCommentSubmit}
        isLiked={props.isLiked}
      />)
    )
  } else {
    return (
      <div>This is very empty <span role="img" aria-label="sad">😔</span>.
      Upload a photo or follow friends to be able to do what they do <span role="img" aria-label="wink">😉</span>
      </div>
    )
  }
}

export default ColumnPostList