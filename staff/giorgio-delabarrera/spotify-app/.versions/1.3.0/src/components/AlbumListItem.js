import React from 'react'

function AlbumListItem(props) {
  
  const { id, image, name, artistName } = props

  return (
    <div className="album-list-item">
      <a href="#/" data-id={id} onClick={() => props.onClick(id)}>
        <img className="album-list-item__image" src={image} alt={name}/>
      </a>
      <h3 className="album-list-item__title">
        <a href="#/" onClick={() => props.onClick(id)}>{name}</a>
      </h3>
      <div className="album-list-item__artist">{artistName}</div>
    </div>
  )
}

export default AlbumListItem