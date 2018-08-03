import React, { Component } from 'react'
import PhotoDetail from '../components/PhotoDetail';
import Header from '../components/Header';
import { withRouter } from 'react-router-dom'
import logic from '../logic'

logic.unsplashAccessKey = 'f054c8ab6f6003082f765a95a875c1fa31770d47f951f23c7bb85c8865559406'

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
    if (this.props.loggedIn) {
      logic.togglePhotoLike(this.props.id)
        .then(() => {
          this.setState({ isLiked: logic.isLiked(this.props.id) })
        })
    } else {
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <div>
        <Header loggedIn={this.props.loggedIn} />
        <main>
          <div className="push-40">
            {
              this.state.photo && <PhotoDetail
                id={this.state.photo.id}
                url={this.state.photo.urls.regular}
                location={this.state.photo.location ? this.state.photo.location.title : ''}
                isLiked={this.state.isLiked}
                onLikeClick={this.togglePhotoLike}
              />
            }
          </div>
        </main>
      </div>
    )
  }
}

export default withRouter(PhotoDetailPage)