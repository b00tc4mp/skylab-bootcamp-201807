import React, { Component } from 'react'

class PhotoDetail extends Component {

  handleLikeClick = () => {
    this.props.onLikeClick()
  }

  render() {

    return (
      <section className="photo-detail">
        <div className="photo-detail__top">
          <div className="photo-detail__buttons">
            <button
              className={this.props.isLiked ? 'photo-detail__like photo-detail__like--is-liked' : 'photo-detail__like'}
              onClick={this.handleLikeClick}
            >
              <i className="fas fa-heart fa-lg"></i>
            </button>
          </div>
        </div>
        <div className="photo-detail__image">
          <img src={this.props.url} alt={this.props.id} />
        </div>
        {
          this.props.location && (
            <div className="photo-detail__location">
              <i className="fas fa-map-marker-alt fa-xs"></i>
              <a
                href={`https://www.google.com/maps?q=${this.props.location}`}
                target="_blank"
                className="photo-detail__location-link"
              > {this.props.location}
              </a>
            </div>
          )
        }

      </section>
    )
  }
}

export default PhotoDetail