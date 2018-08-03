import React, { Component } from 'react'
import Search from '../components/Search';
import logic from '../logic'
import Block from '../components/Block';
import Header from '../components/Header';
import PhotoList from '../components/PhotoList';
import { withRouter } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller';

logic.unsplashAccessKey = '6a4d6b1b0f0719f5c63b9f29cf900ee814ade514f0d60c7a4d7dc451663a3533'
const MAX_POPULARS_PHOTOS = 500

class HomePage extends Component {

  state = {
    popularsPhotos: [],
    loadMorePhotos: true
  }

  handleSearchSubmit = query => {
    this.props.history.push(`/search/photos/${query}`)
  }

  handlePhotoClick = photoId => {
    this.props.history.push(`/photos/${photoId}`)
  }

  handleLoadMore = page => {

    if (this.state.loadMorePhotos) {

      logic.retrievePopularPhotos(page)
        .then(results => {
          let popularsPhotos = this.state.popularsPhotos
          results.forEach(photo => {
            popularsPhotos.push({
              id: photo.id,
              url: photo.urls.regular
            })
          })
          this.setState({ popularsPhotos })

          if (page >= MAX_POPULARS_PHOTOS) {
            this.setState({ loadMorePhotos: false })
          }
        })
    }
  }

  render() {
    return (
      <div>
        <Header loggedIn={this.props.loggedIn} visibleSearch={false} />
        <main>
          <section className="showcase-container" style={{ backgroundImage: "url('images/man.jpg')" }}>
            <div className="showcase">
              <Block
                title="INSPIRE"
                description="Beautiful, free photos. Gifted by the world’s most generous community of photographers."
              />
              <Search
                inputPlaceholder="Insert a word to inspire your mind..."
                inputHelp="Trending searches: business, computer, nature, love, house,..."
                onSearch={this.handleSearchSubmit}
              />
            </div>
          </section>
          <section>
            <ul className="tabs">
              <li className="tabs__item">
                <a href="#/" className="tabs__link tabs__link--active">Populars</a>
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
                photos={this.state.popularsPhotos}
                onPhotoClick={this.handlePhotoClick}
              />
            </InfiniteScroll>
          </section>
        </main>
      </div>
    )
  }
}

export default withRouter(HomePage)