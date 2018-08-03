import React, { Component } from 'react'
import Profile from '../components/Profile';
import Header from '../components/Header';
import PhotoList from '../components/PhotoList';
import { withRouter } from 'react-router-dom'
import logic from '../logic'

class ProfilePage extends Component {

  state = {
    user: null,
    favoritePhotos: []
  }

  componentDidMount() {

    logic.retrieveUserById(this.props.id)
      .then(user => {
        this.setState({ user })

        logic.userLikes.forEach(photoId => {
          logic.retrievePhotoById(photoId)
            .then(photo => {
              let favoritePhotos = this.state.favoritePhotos
              favoritePhotos.push({
                id: photo.id,
                url: photo.urls.regular
              })
              this.setState({ favoritePhotos })
            })
        })
      })
  }

  goToEditProfile = () => {
    this.props.history.push(`/profile/edit`)
  }

  handlePhotoClick = photoId => {
    this.props.history.push(`/photos/${photoId}`)
  }

  render() {
    return (
      <div>
        <Header loggedIn={this.props.loggedIn} />
        <main>
          <section className="profile-container">
            {
              this.state.user &&
              <Profile
                id={this.state.user.id}
                firstName={this.state.user.firstName}
                lastName={this.state.user.lastName}
                description={this.state.user.description}
                onClickEdit={this.goToEditProfile}
              />
            }
          </section>
          <section className="content push-50-l push-50-r">
            <ul className="tabs">
              <li className="tabs__item">
                <a href="#/" className="tabs__link tabs__link--active">{this.state.favoritePhotos.length} Favorites</a>
              </li>
            </ul>
          </section>
          <section className="content push-70-l push-70-r">
            <PhotoList
              photos={this.state.favoritePhotos}
              onPhotoClick={this.handlePhotoClick}
            />
          </section>
        </main>
      </div>
    )
  }
}

export default withRouter(ProfilePage)