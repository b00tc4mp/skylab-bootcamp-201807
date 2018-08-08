import React, {Component} from "react";


function TrackPlayer(props) {

  const {title,image,file,url} = props.track;


  return <section>
    <h2>{title}</h2>
    <img src={image} alt={title} />
    <audio controls>
      <source src={file} type="audio/mpeg" />
    </audio>
    <a href={url} target="_blank">Open in original player</a>
  </section>
}

export default TrackPlayer