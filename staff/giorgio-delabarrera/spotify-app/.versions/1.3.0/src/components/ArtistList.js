import React from 'react'
import ArtistListItem from './ArtistListItem'

function ArtistList(props) {

  const {artists} = props

  return (
    <section className="artist-list">
      { artists.map((artist) => {
        return (
          <ArtistListItem
            key={artist.id} 
            id={artist.id}
            name={artist.name}
            image={artist.image}
            onClick={props.onArtistClick}
          />
        )
      }) }
    </section>
  )
}

export default ArtistList