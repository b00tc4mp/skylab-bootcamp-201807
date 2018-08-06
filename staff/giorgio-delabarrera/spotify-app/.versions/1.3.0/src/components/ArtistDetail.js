import React from 'react'
import AlbumListItem from './AlbumListItem'

function ArtistDetail(props) {
  
  const { artist } = props

  return (
    <div data-id={artist.id}>
      <section className="artist-detail" style={{ backgroundImage: `url("${artist.image}")` }}>
        <h1 className="artist-detail__title">{artist.name}</h1>
      </section>
      <section className="album-list">
        <h2 className="album-list__title">Albums</h2>
        <div className="album-list__grid">
          
          { artist.albums.map(album => {
            return (
              <AlbumListItem 
                key={album.id}
                id={album.id}
                image={album.image}
                name={album.name}
                artistName={artist.name} 
                onClick={props.onAlbumClick}
                />
            )
          }) }

        </div>
      </section>
    </div>
  )
}

export default ArtistDetail