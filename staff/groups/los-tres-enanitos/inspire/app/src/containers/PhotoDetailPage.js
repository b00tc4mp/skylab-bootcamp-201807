import React, { Component } from 'react'
import PhotoDetail from '../components/PhotoDetail';
import Header from '../components/Header';
import { withRouter } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller';
import PhotoList from '../components/PhotoList';
import logic from '../logic'

logic.unsplashAccessKey = '88da259f8e2bfd79534815ca812292719b02ad2ca90ed4ed04deeb63753d75bc'

class PhotoDetailPage extends Component {

  state = {
    photo: null,
    isLiked: logic.isLiked(this.props.id),
    relatedPhotos: [],
    loadMoreRelatedPhotos: true
  }

  componentDidMount() {
    logic.retrievePhotoById(this.props.id)
      .then(photo => {
        this.setState({ photo })
      })
  }

  componentWillReceiveProps(newProps) {
    logic.retrievePhotoById(newProps.id)
      .then(photo => {
        this.setState({
          photo,
          isLiked: logic.isLiked(newProps.id),
          relatedPhotos: [],
          loadMoreRelatedPhotos: true
        })
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

  retrieveRelatedPhotos = (page = 1) => {
    const query = this.state.photo.location ? this.state.photo.location : ''
    if (query) {
      logic.searchPhotos(query, page)
        .then(res => {
          let relatedPhotos = this.state.relatedPhotos
          res.results.forEach(photo => {
            relatedPhotos.push({
              id: photo.id,
              url: photo.urls.regular
            })
          })
          this.setState({ relatedPhotos })

          if (page >= res.total_pages) {
            this.setState({ loadMoreRelatedPhotos: false })
          }
        })
    }
  }

  handleLoadMoreRelatedPhotos = page => {
    if (this.state.loadMoreRelatedPhotos) {
      this.retrieveRelatedPhotos(page)
    }
  }

  handleRelatedPhotoClick = photoId => {
    this.props.history.push(`/photos/${photoId}`)
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
          {this.state.photo && this.state.photo.location && (
            <div>
              <section className="content">
                <ul className="tabs">
                  <li className="tabs__item">
                    <a href="#/" className="tabs__link tabs__link--active">Related photos</a>
                  </li>
                </ul>
              </section>
              <section className="content">
                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.handleLoadMoreRelatedPhotos}
                  hasMore={this.state.loadMoreRelatedPhotos}
                  loader={<div className="loader" key={0}>Loading ...</div>}
                >
                  <PhotoList
                    photos={this.state.relatedPhotos}
                    onPhotoClick={this.handleRelatedPhotoClick}
                  />
                </InfiniteScroll>
              </section>
            </div>
          )}
        </main>
      </div>
    )
  }
}

export default withRouter(PhotoDetailPage)