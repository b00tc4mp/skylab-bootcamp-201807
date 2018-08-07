import React from 'react'
import TrackListItem from './TrackListItem';

function AlbumDetail(props) {

  const { album } = props

  return (
    <div className="album-detail">
      <section className="album-detail__detail">
          <img className="album-detail__image" src={album.image} alt={album.name} />
          <h1 className="album-detail__title">{album.name}</h1>
          <h2 className="album-detail__artist"><a href="artist.html">{album.artistName}</a></h2>
          <span className="album-detail__year">{album.releaseDate}</span> ·
          <span className="album-detail__number-songs"> {album.tracks.length} songs</span>
      </section>
      <section className="album-detail__tracks">
          {
            album.tracks.map(track => {
              return (
                <TrackListItem 
                  key={track.id}
                  id={track.id}
                  name={track.name}
                  duration={track.duration}
                  onClick={props.onTrackClick}
                />
              )
            })
          }
      </section>
  </div>
  )
}

export default AlbumDetail