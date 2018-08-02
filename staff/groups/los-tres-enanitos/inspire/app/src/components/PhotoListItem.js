import React, { Component } from 'react'

class PhotoListItem extends Component {

  handleClick = () => {
    this.props.onPhotoClick(this.props.id)
  }

  render() {
    return (
      <div className="photo-list-item">
        <img className="photo-list-item__image" src={this.props.url} alt={this.props.id} onClick={this.handleClick} />
      </div>
    )
  }
}

export default PhotoListItem