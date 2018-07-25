import React from 'react'
import Feedback from "./Feedback";

function TrackPlayer(props) {
  const {onFavorite, track: { id,title, image, file, url } } = props;
    return <section>
        <h2>{title}</h2>
        <img src={image} alt={title} />
        <audio controls>
            <source src={file} type="audio/mpeg" />
        </audio>
        <a href={url} target="_blank">Open in original player</a>
        <a onClick={() => onFavorite(id)} href="#" >Favorite</a>
      {props.error && <Feedback message={props.error} />}

    </section>
}

export default TrackPlayer