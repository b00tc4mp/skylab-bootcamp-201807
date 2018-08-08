import React from 'react'

function Player(props) {

  const { track } = props

  return (
    <section className="player">
      <div className="player__track">
        <img src={track.image} alt="" className="player__track-album" />
        <div className="player__container-track-titles">
          <h3 className="player__track-title">{track.name}</h3>
          <h3 className="player__track-artist">
            <a href="#/">{track.artistName}</a>
          </h3>
        </div>
      </div>
      <div className="player__controls">
        <audio controls>
          <source src={track.file} type="audio/mpeg"/>
          Your browser does not support the audio tag.
        </audio>
      </div>
  </section>
  )
}

export default Player