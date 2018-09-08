import React, { Component } from 'react'

class EditAvatar extends Component {

  state = {
    imageUrl: this.props.imageUrl,
    image: undefined,
  }

  handleImage = e => {
    this.setState({ image: e.target.files[0] })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { image } = this.state

    if (image) this.props.onSubmit(image)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <img src={this.state.imageUrl} alt="" />
        </div>
        <div>
          <input type="file" name="avatar" id="avatar" onChange={this.handleImage} />
        </div>
        <button type="submit">Change profile photo</button>
      </form>
    )
  }
}

export default EditAvatar