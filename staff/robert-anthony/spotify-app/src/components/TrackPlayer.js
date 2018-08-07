import React from 'react'
import Feedback from "./Feedback";
import styled, { css } from 'styled-components'

const Favorite = styled.a`cursor:pointer;color:yellow;background-color:blue;font-size:2-em`

function TrackPlayer(props) {
  const {onFavorite,onUnFavorite, track: {isFavorite, id,title, image, file, url } } = props;
    return <section>
        <h2>{title}</h2>
        <img src={image} alt={title} />
        <audio controls>
            <source src={file} type="audio/mpeg" />
        </audio>
        <a href={url} target="_blank">Open in original player</a>

         {!isFavorite &&  <a onClick={() => onFavorite(id)} href="#" ><i className="far fa-heart"></i></a>}
      {isFavorite &&  <a onClick={() => onUnFavorite(id)} href="#" ><i className="fas fa-heart"></i></a>}

      {props.error && <Feedback message={props.error} />}
{/*
<i class="far fa-heart"></i>

<i class="fas fa-heart"></i>



*/}




    </section>
}

export default TrackPlayer