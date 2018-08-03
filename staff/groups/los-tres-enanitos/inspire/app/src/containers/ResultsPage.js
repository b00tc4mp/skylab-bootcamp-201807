import React, { Component } from 'react'
import Header from '../components/Header';
import PhotoList from '../components/PhotoList';
import { withRouter } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller';
import logic from '../logic'

logic.unsplashAccessKey = '9d88b56a9b3c1de8294c01c48e61c2dedbc7ebccb6b739e8d5920a7b867feb14'

class ResultsPage extends Component {

  state = {
    photos: [],
    photosTotalResults: 0,
    loadMorePhotos: true
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      photos: [],
      photosTotalResults: 0,
      loadMorePhotos: true
    }, () => this.search(newProps.query))
  }

  search(query, page = 1) {
    if (this.state.loadMorePhotos) {
      logic.searchPhotos(query, page)
        .then(res => {
          this.setState({ photosTotalResults: res.total })

          let photos = this.state.photos
          res.results.forEach(photo => {
            photos.push({
              id: photo.id,
              url: photo.urls.regular
            })
          })
          this.setState({ photos })

          if (page >= res.total_pages) {
            this.setState({ loadMorePhotos: false })
          }
        })
    }
  }

  handlePhotoClick = photoId => {
    this.props.history.push(`/photos/${photoId}`)
  }

  handleLoadMore = page => {
    this.search(this.props.query, page)
  }

  render() {
    return (
      <div>
        <Header loggedIn={this.props.loggedIn} query={this.props.query} />
        <main>
          <section className="content">
            <h1 className="title">
              {
                this.props.query && this.props.query[0].toUpperCase() + this.props.query.slice(1)
              }
            </h1>
          </section>
          <section>
            <ul className="tabs">
              <li className="tabs__item">
                <a href="#/" className="tabs__link">{this.state.photosTotalResults} Photos</a>
              </li>
            </ul>
          </section>
          <section className="content">
            <InfiniteScroll
              pageStart={0}
              loadMore={this.handleLoadMore}
              hasMore={this.state.loadMorePhotos}
              loader={<div className="loader" key={0}>Loading ...</div>}
            >
              <PhotoList
                photos={this.state.photos}
                onPhotoClick={this.handlePhotoClick}
              />
            </InfiniteScroll>
          </section>
        </main>
      </div>
    )
  }
}

export default withRouter(ResultsPage)