
onSearch = query => {
  logic.searchArtists(query)
    .then(artists => {
      this.setState({
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
          title: track.name,
          image: track.album.images[0].url,
          file: track.preview_url,
          url: track.external_urls.spotify
        }
      })
    })
    .catch(console.error)
}


//es un metodo de class. Cada vez que hay un cambio de stado viene al render i actualiza
render = id => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Spotify</h1>
      </header>

      <SearchPanel onSearch={this.onSearch} />  {/**instancia. A un componente hijo le pasamos cosas a traves de props*/}

      <ResultList results={this.state.artists} onItemClick={this.onArtistClick} />

      <ResultList results={this.state.albums} onItemClick={this.onAlbumClick} />

      <ResultList results={this.state.tracks} onItemClick={this.onTrackClick} />

      {this.state.track && <TrackPlayer track={this.state.track} />}
      {/* Si lo de la izquierda es treu ejecuta lo de la derecha */}
      {/*Si es undefined es false*/}

    </div>
  );
}


