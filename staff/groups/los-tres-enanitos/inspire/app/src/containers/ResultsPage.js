import React, { Component } from 'react'
import Header from '../components/Header';
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
    logic.searchPhotos(query)
      .then(res => {
        this.setState({ photos: res.results })
      })
  }

  render() {
    return (
      <div>
        <Header query={this.props.query}/>
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
            <div className="photo-list">
              {
                this.state.photos.map(photo => {
                  return (
                    <div className="photo-list-item" key={photo.id}>
                      <img className="photo-list-item__image" src={photo.urls.regular} alt="" />
                    </div>
                  )
                })
              }
            </div>
          </section>
        </main>
      </div>
    )
  }
}

export default ResultsPage