import React, { Component } from 'react'
import logic from './logic'
import SiteNav from './components/SiteNav'
import RecentlyPlayed from './components/RecentlyPlayed'
import SearchPanel from './components/SearchPanel';
import ArtistList from './components/ArtistList';
import ArtistDetail from './components/ArtistDetail';
import AlbumDetail from './components/AlbumDetail';
import Player from './components/Player';

logic.token = 'BQAAdt9887WjshA69kIY4Ecvs581n3E0cowoiu6bL8yIf15_XLjo60pMMUG0ipzkziIK3qs_BQfjJ3ivPDw';

const DEFAULT_ARTIST_IMG = 'http://assets.sk-static.com/images//default_images/col4/default-artist.png'
const DEFAULT_ALBUM_IMG = 'http://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png'

class App extends Component {

  state = {
    artists: [],
    albums: [],
    artist: undefined,
    album: undefined,
    track: undefined,
  }

  _hideHome = () => document.getElementById('home').style.display = 'none'

  _showHome = () => document.getElementById('home').style.display = ''

  _hideArtistDetail = () => document.getElementById('artist-detail').style.display = 'none'

  _showArtistDetail = () => document.getElementById('artist-detail').style.display = ''

  _hideAlbumDetail = () => document.getElementById('album-detail').style.display = 'none'

  _showAlbumDetail = () => document.getElementById('album-detail').style.display = ''

  redirectToHome() {
    this._hideArtistDetail()
    this._hideAlbumDetail()
    this._showHome()
  }

  redirectToArtistDetail() {
    this._hideHome()
    this._showArtistDetail()
  }

  redirectToAlbumDetail() {
    this._hideArtistDetail()
    this._showAlbumDetail()
  }

  onSearch = query => {
    logic.searchArtists(query)
      .then(artists => {
        this.setState({
          artists: artists.map(artist => {
            return {
              id: artist.id,
              name: artist.name,
              image: artist.images && artist.images[1] ? artist.images[1].url : DEFAULT_ARTIST_IMG
            }
          })
        })
      })
      .catch(console.error)
  }

  onArtistClick = id => {

    logic.retrieveArtistById(id)
      .then(artist => {
        logic.retrieveAlbumsByArtistId(id)
          .then(albums => {
            this.setState({
              artist: {
                id: artist.id,
                name: artist.name,
                image: artist.images && artist.images[0] ? artist.images[0].url : DEFAULT_ARTIST_IMG,
                albums: albums.map(album => {
                  return {
                    id: album.id,
                    image: album.images && album.images[0] ? album.images[0].url : DEFAULT_ALBUM_IMG,
                    name: album.name
                  }
                })
              }
            })
          })
          .then(() => {
            this.redirectToArtistDetail()
          })
          .then(console.log)
          .catch(console.error)
      })
      .catch(console.error)
  }

  onAlbumClick = id => {

    logic.retrieveAlbumById(id)
      .then(album => {
        logic.retrieveTracksByAlbumId(id)
          .then(tracks => {
            this.setState({
              album: {
                id: album.id,
                name: album.name,
                image: album.images && album.images[0] ? album.images[0].url : DEFAULT_ALBUM_IMG,
                artistName: album.artists[0].name,
                releaseDate: album.release_date,
                tracks: tracks.map(track => {
                  return {
                    id: track.id,
                    name: track.name,
                    duration: track.duration_ms,
                    file: track.preview_url,
                    url: track.external_urls.spotify
                  }
                })
              }
            })
          })
          .then(() => {
            this.redirectToAlbumDetail()
          })
          .then(console.log)
          .catch(console.error)
      })
      .catch(console.error)
  }

  onTrackClick = id => {

    const audio = document.querySelector('.player audio')
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }

    logic.retrieveTrackById(id)
      .then(track => {
        this.setState({
          track: {
            id: track.id,
            name: track.name,
            duration: track.duration_ms,
            image: track.album.images && track.album.images[0] ? track.album.images[0].url : DEFAULT_ALBUM_IMG,
            file: track.preview_url,
            url: track.external_urls.spotify,
            artistName: track.artists[0].name
          }
        })
      })
      .then(() => {
        const audio = document.querySelector('.player audio')
        if (audio) audio.play()
      })
      .then(console.log)
      .catch(console.error)
  }

  render() {
    return (
      <div className="App">
        <section>
          <header id="sidebar">
            <img src="assets/img/logo.png" alt="Spotify" id="logo" />
            <SiteNav />
            <RecentlyPlayed />
          </header>
          <main>
            <div id="home">
              <SearchPanel onSearch={this.onSearch} />
              <ArtistList artists={this.state.artists} onArtistClick={this.onArtistClick} />
            </div>
            <div id="artist-detail" style={{ display: 'none' }}>
              {this.state.artist && <ArtistDetail artist={this.state.artist} onAlbumClick={this.onAlbumClick} />}
            </div>
            <div id="album-detail" style={{ display: 'none' }}>
              {this.state.album && <AlbumDetail album={this.state.album} onTrackClick={this.onTrackClick} />}
            </div>
          </main>
        </section>
        <footer>
          {this.state.track && <Player track={this.state.track} />}
        </footer>
      </div>
    );
  }
}

export default App;
