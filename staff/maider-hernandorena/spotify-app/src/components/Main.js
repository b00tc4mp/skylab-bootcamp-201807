import React, { Component } from 'react'
import SearchPanel from './SearchPanel'
import ResultList from './ResultList'
// import TrackPlayer from './TrackPlayer'
import SpotifyPlayer from './SpotifyPlayer'
import logic from '../logic'
import Admin from './Admin'
import UpdatePanel from './UpdatePanel';
import './css/main.css'

class Main extends Component {

  state = { 
    artists: [], 
    albums: [], 
    tracks: [], 
    track: undefined, 
    searchWrong: null,
    artistWrong: null,
    albumWrong: null,
    trackWrong: null,
  }

  onSearch = query => {
    logic.searchArtists(query)
      .then(artists => {
        this.setState({ 
          artists: artists.map(artist => {
            return { id: artist.id, text: artist.name }
          }), 
          albums: [],
          tracks: [],
          track: undefined,
          searchWrong: null,
          artistWrong: null,
          albumWrong: null,
          trackWrong: null
        })
      })
      .catch(({message}) => this.setState({ searchWrong: message }))
  }

  onArtistClick = id => {
    logic.retrieveAlbumsByArtistId(id)
      .then(albums => {
        this.setState({ 
          albums: albums.map(album => {
            return { id: album.id, text: album.name }
          }) , 
          tracks: [],
          track: undefined,
          searchWrong: null,
          artistWrong: null,
          albumWrong: null,
          trackWrong: null,
           
        })
      })
      .catch(({message}) => this.setState({ artistWrong: message }))
  }

  onAlbumClick = id => {
    logic.retrieveTracksByAlbumId(id)
      .then(tracks => {
        this.setState({ 
        tracks: tracks.map(track => {
            return { id: track.id, text: track.name }
        }) ,
        track: undefined,
        searchWrong: null,
        artistWrong: null,
        albumWrong: null,
        trackWrong: null 
        })
      })
      .catch(({message}) => this.setState({ albumWrong: message }))
  }

  onTrackClick = id => {
    logic.retrieveTrackById(id)
      .then(track => {
        this.setState({
          // track: {title: track.name, image: track.album.images[0].url, file: track.preview_url, url: track.external_urls.spotify}
          track: {id: track.id, title: track.name},
          searchWrong: null,
          artistWrong: null,
          albumWrong: null,
          trackWrong: null,
        })
      })
      .catch(({message}) => this.setState({ trackWrong: message }))
  }

  onclicking = () => {
    this.props.onUpdating()
    
  }

  back = () => {
    this.props.gobackUpdate()
  }

  

  // onUpdating = () => this.setState({ mainActive: false })

  render() {

    const {state: {artists, albums, tracks, track, searchWrong, artistWrong, albumWrong, trackWrong}, onSearch, onArtistClick, onAlbumClick, onTrackClick} = this

    return ( <section className="main">

        <Admin clickLogOut={this.props.onLogout} clickUpdate={this.onclicking} clickDelete={this.props.onDelete} />
        {this.props.updateActive && <UpdatePanel onUpdate={this.props.onUpdate} onBack={this.props.back} />}

        {this.props.goToMain && <div>
          <h2 className="main__searchtitle" >Search by Artist:</h2>
          <SearchPanel onSearch={onSearch} error={searchWrong}/>

          <section className="main__grid">
          {artists.length > 0 && <section className="main__grid__list"><h2 className="main__grid__list__titles">Artists:</h2><ResultList results={artists} clickItem={onArtistClick} error={artistWrong} /></section>}

          {albums.length > 0 && <section className="main__grid__list"><h2 className="main__grid__list__titles">Albums:</h2><ResultList results={albums} clickItem={onAlbumClick} error={albumWrong} /></section> }
          
          {tracks.length > 0 && <section className="main__grid__list"><h2 className="main__grid__list__titles">Tracks:</h2><ResultList results={tracks} clickItem={onTrackClick} error={trackWrong} /></section> }
          </section>

          {/* {track && <TrackPlayer track={track}/>} */}
          {track && <SpotifyPlayer className="main__track" track={track}/>}
        </div> 
        }
        
      </section>
    );
  }
}

export default Main