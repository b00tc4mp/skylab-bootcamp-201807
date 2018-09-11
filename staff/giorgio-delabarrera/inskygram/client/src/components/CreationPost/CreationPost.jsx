import React, { Component } from 'react'

class CreationPost extends Component {

  state = {
    image: undefined,
    caption: '',
    modalIsOpen: false
  }

  handleImage = event => {
    this.setState({ image: event.target.files[0] })
  }

  handleCaption = event => this.setState({ caption: event.target.value })

  handleSubmit = event => {
    event.preventDefault()

    const { image, caption } = this.state

    this.props.onSubmit(image, caption)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="image">Image</label>
            <input type="file" name="image" id="image" onChange={this.handleImage} />
          </div>
          <div>
            <label htmlFor="caption">Caption</label>
            <input type="text" name="" id="caption" onChange={this.handleCaption} />
          </div>
          <button type="submit" >Submit</button>
        </form>
      </div>
    )
  }
}

export default CreationPost