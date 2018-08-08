import React from 'react'

function TrackListItem(props) {

  const { id, name, duration } = props

  return (
    <div className="track-list-item">
      <a href="#/" data-id={id} onClick={() => props.onClick(id)}>
        <i className="track-list-item__play-icon fas fa-music"></i>
      </a>
      <h3 className="track-list-item__title">{name}</h3>
      {/* <span className="track-list-item__play-time">4:40</span> */}
      <span className="track-list-item__play-time">{duration}</span>
    </div>
  )
}

export default TrackListItem