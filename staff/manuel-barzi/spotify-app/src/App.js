import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from './components/SearchPanel'
import ResultList from './components/ResultList'
// import TrackPlayer from './components/TrackPlayer'
import SpotifyPlayer from './components/SpotifyPlayer';
import logic from './logic'

logic.token = 'BQCTOhL540Rw05bADhq_IKdv0eE4l--5PlllsqHcV9HfkTyuhyfNCif31tQu_tfP1vaTKzJCcZKAwusoPq4Q2trFFR3Yh_Jm7X5txi7HQsfNdiETlScZ8oamsjYHOVwaEbL0iVOcllbh'

class App extends Component {
  state = {
    artists: [],
    albums: [],
    tracks: [],
    track: undefined // { title, image, file, url }
  }

  onSearch = query => {
    logic.searchArtists(query)
      .then(artists => {
        this.setState({
          // artists: artists.map(function (artist) {
          //   return {
          //     id: artist.id,
          //     text: artist.name
          //   }
          // }),

          // artists: artists.map(artist => {
          //   return {
          //     id: artist.id,
          //     text: artist.name
          //   }
          // }),

          // artists: artists.map(({ id, name }) => {
          //   return {
          //     id,
          //     text: name
          //   }
          // }),

          // artists: artists.map(({ id, name }) => ({ id, text: name })),

          artists: artists.map(({ id, name: text }) => ({ id, text })),
          albums: [],
          tracks: [],
          track: undefined
        })
      })
      .catch(console.error)
  }

  onArtistClick = id => {
    logic.retrieveAlbumsByArtistId(id)
      .then(albums => {
        this.setState({
          albums: albums.map(({ id, name: text }) => ({ id, text })),
          tracks: [],
          track: undefined
        })
      })
      .catch(console.error)
  }

  onAlbumClick = id => {
    logic.retrieveTracksByAlbumId(id)
      .then(tracks => {
        this.setState({
          tracks: tracks.map(({ id, name: text }) => ({ id, text })),
          track: undefined
        })
      })
      .catch(console.error)
  }

  onTrackClick = id => {
    logic.retrieveTrackById(id)
      .then(track => {
        this.setState({
          track: {
            id: track.id,
            title: track.name
            // image: track.album.images[0].url,
            // file: track.preview_url,
            // url: track.external_urls.spotify
          }
        })
      })
      // WARN! do not abuse of destructuring if its projection is not very reusable
      // .then(({ id, name: title, album: { images: [{ url: image }] }, preview_url: file, external_urls: { spotify: url } }) => {
      //   this.setState({
      //     track: {
      //       id,
      //       title,
      //       // image: track.album.images[0].url,
      //       image,
      //       // file: track.preview_url,
      //       file,
      //       // url: track.external_urls.spotify
      //       url
      //     }
      //   })
      // })
      .catch(console.error)
  }

  render() {
    const { state: { artists, albums, tracks, track }, onSearch, onArtistClick, onAlbumClick, onTrackClick } = this

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spotify App</h1>
        </header>

        <h2>Search</h2>

        <SearchPanel onSearch={onSearch} />

        {/* {artists.length > 0 && <h2>Artists</h2>}

        {artists.length > 0 && <ResultList results={artists} onItemClick={onArtistClick} />} */}

        {artists.length > 0 && <section><h2>Artists</h2><ResultList results={artists} onItemClick={onArtistClick} /></section>}

        {albums.length > 0 && <section><h2>Albums</h2><ResultList results={albums} onItemClick={onAlbumClick} /></section>}

        {tracks.length > 0 && <section><h2>Tracks</h2><ResultList results={tracks} onItemClick={onTrackClick} /></section>}

        {/* {track && <section><h2>Track</h2><TrackPlayer track={track} /></section>} */}
        {track && <section><h2>Track</h2><SpotifyPlayer track={track} /></section>}
      </div>
    );
  }
}

export default App;
