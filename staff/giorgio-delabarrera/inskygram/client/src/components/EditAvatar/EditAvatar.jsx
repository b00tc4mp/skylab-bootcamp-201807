import React, { Component } from 'react'
import './EditAvatar.sass'

class EditAvatar extends Component {

  state = {
    imageUrl: this.props.imageUrl,
    image: undefined,
  }

  handleImage = e => {
    this.setState({ image: e.target.files[0] }, () => {
      this.refs.editAvatarForm.dispatchEvent(new Event('submit'))
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { image } = this.state

    if (image) this.props.onSubmit(image)
  }

  render() {
    return (
      <div className="EditAvatar">
        <form ref="editAvatarForm" className="EditAvatar-form" onSubmit={this.handleSubmit}>
          <div className="EditAvatar-field">
            <div className="EditAvatar-avatarWrapper">
              <img className="EditAvatar-avatar" src={this.state.imageUrl} alt="" />
            </div>
            <div className="EditAvatar-userInfo">
              <h1 className="EditAvatar-username">giodelabarrera</h1>
              <label htmlFor="avatar" className="EditAvatar-changeAvatarLink">Change Profile Photo</label>
            </div>
          </div>
          <input type="file" className="EditAvatar-inputFile" name="avatar" id="avatar" onChange={this.handleImage} />
        </form>
      </div>
    )
  }
}

export default EditAvatar