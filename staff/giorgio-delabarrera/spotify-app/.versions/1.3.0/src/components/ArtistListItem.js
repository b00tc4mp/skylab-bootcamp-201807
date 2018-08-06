import React from 'react'

function ArtistListItem(props) {
  
  const {id, name, image} = props
  
  return (
    <div className="artist-list-item">
      <a href="#/" data-id={id} onClick={() => props.onClick(id)}>
        <img className="artist-list-item__image" src={image} alt={name} />
      </a>
      <h3 className="artist-list-item__title">
        <a href="#/" data-id={id} onClick={() => props.onClick(id)}>{name}</a>
      </h3>
    </div>
  )
}

export default ArtistListItem