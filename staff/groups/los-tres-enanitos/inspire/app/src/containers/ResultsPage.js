import React, { Component } from 'react'
import Header from '../components/Header';
import PhotoList from '../components/PhotoList';
import { withRouter } from 'react-router-dom'
import logic from '../logic'

logic.unsplashAccessKey = '1cb96dfdb0925fb516e37123f0c906d5fbaadf2669fb3b9c5f0f833539476627'

class ResultsPage extends Component {

  state = {
    photos: []
  }

  componentDidMount() {
    this.search(this.props.query)
  }

  componentWillReceiveProps(newProps) {
    this.search(newProps.query)
  }

  search(query) {
    this.setState({ photos: [] })
    logic.searchPhotos(query)
      .then(res => {
        res.results.forEach(photo => {
          let photos = this.state.photos
          photos.push({
            id: photo.id,
            url: photo.urls.regular
          })
          this.setState({ photos })
        })
      })
  }

  handlePhotoClick = photoId => {
    this.props.history.push(`/photos/${photoId}`)
  }

  render() {
    return (
      <div>
        <Header query={this.props.query} />
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
                <a href="#/" className="tabs__link">{this.state.photos.length} Photos</a>
              </li>
            </ul>
          </section>
          <section className="content">
            <PhotoList
              photos={this.state.photos}
              onPhotoClick={this.handlePhotoClick}
            />
          </section>
        </main>
      </div>
    )
  }
}

export default withRouter(ResultsPage)