import React, { Component } from 'react'
import PhotoDetail from '../components/PhotoDetail';
import Header from '../components/Header';
import { withRouter } from 'react-router-dom'
import logic from '../logic'

logic.unsplashAccessKey = '1cb96dfdb0925fb516e37123f0c906d5fbaadf2669fb3b9c5f0f833539476627'

class PhotoDetailPage extends Component {

  state = {
    photo: null,
    isLiked: logic.isLiked(this.props.id)
  }

  componentDidMount() {
    logic.retrievePhotoById(this.props.id)
      .then(photo => {
        this.setState({ photo })
      })
  }

  togglePhotoLike = () => {
    logic.togglePhotoLike(this.props.id)
      .then(() => {
        this.setState({ isLiked: logic.isLiked(this.props.id) })
      })
  }

  render() {
    return (
      <div>
        <Header loggedIn={this.props.loggedIn} />
        <main>
          {
            this.state.photo && <PhotoDetail
              id={this.state.photo.id}
              url={this.state.photo.urls.regular}
              location={this.state.photo.location ? this.state.photo.location.title : ''}
              isLiked={this.state.isLiked}
              onLikeClick={this.togglePhotoLike}
            />
          }
        </main>
      </div>
    )
  }
}

export default withRouter(PhotoDetailPage)