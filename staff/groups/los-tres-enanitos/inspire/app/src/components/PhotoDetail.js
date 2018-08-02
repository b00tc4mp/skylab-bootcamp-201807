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
              className={ this.props.isLiked ? 'photo-detail__like' : 'photo-detail__unlike' }
              onClick={this.handleLikeClick}
              >
              <i className="fas fa-heart"></i>
            </button>

            {/* <button className="photo-detail__collect">
              <i className="fas fa-plus"></i> COLLECT</button>

            <button className="photo-detail__download">
              <i className="fas fa-arrow-down"></i> DOWNLOAD
                </button>

            <button className="photo-detail__download">
              <i className="fas fa-arrow-down"></i>
            </button> */}

          </div>

        </div>
        <div className="photo-detail__image">
          <img src={this.props.url} alt="photo" />
        </div>
        {
          this.props.location && (
            <div className="photo-detail__location">
              <i className="fas fa-map-marker-alt"></i>
              <span> {this.props.location}</span>
            </div>
          )
        }

      </section>
    )
  }
}

export default PhotoDetail