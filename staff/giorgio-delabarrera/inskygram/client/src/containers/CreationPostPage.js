import React, { Component } from 'react'
import logic from '../logic'
import CreationPost from '../components/CreationPost';

class CreationPostPage extends Component {

  handleCreationSubmit = (image, caption) => {
    const { loggedInUsername, token } = this.props

    logic.createPost(loggedInUsername, image, caption, token)
      .then(() => console.log("post creado"))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <CreationPost onSubmit={this.handleCreationSubmit} />
      </div>
    )
  }
}

export default CreationPostPage