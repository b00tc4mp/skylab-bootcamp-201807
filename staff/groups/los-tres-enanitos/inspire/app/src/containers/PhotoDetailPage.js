import React, { Component } from 'react'
import PhotoDetail from '../components/PhotoDetail';
import Header from '../components/Header';
import { withRouter } from 'react-router-dom'
import logic from '../logic'

logic.unsplashAccessKey = '88da259f8e2bfd79534815ca812292719b02ad2ca90ed4ed04deeb63753d75bc'

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