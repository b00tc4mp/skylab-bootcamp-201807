import React, { Component } from 'react'
import Search from '../components/Search';
import logic from '../logic'
import Block from '../components/Block';
import Header from '../components/Header';
import PhotoList from '../components/PhotoList';

logic.unsplashAccessKey = '1cb96dfdb0925fb516e37123f0c906d5fbaadf2669fb3b9c5f0f833539476627'

class HomePage extends Component {

  state = {
    popularsPhotos: []
  }

  componentDidMount() {
    logic.retrievePopularPhotos()
      .then(results => {
        results.forEach(photo => {
          let popularsPhotos = this.state.popularsPhotos
          popularsPhotos.push({
            id: photo.id,
            url: photo.urls.regular
          })
          this.setState({ popularsPhotos })
        })
      })
  }

  handleSearchSubmit = query => {
    this.props.history.push(`/search/photos/${query}`)
  }

  handlePhotoClick = photoId => {
    this.props.history.push(`/photos/${photoId}`)
  }

  render() {
    return (
      <div>
        <Header visibleSearch={false} />
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
            <PhotoList
              photos={this.state.popularsPhotos}
              onPhotoClick={this.handlePhotoClick}
            />
          </section>
        </main>
      </div>
    )
  }
}

export default HomePage