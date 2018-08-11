import React from 'react'
import PhotoListItem from './PhotoListItem';

const PhotoList = (props) => {
  return (
    <div className="photo-list">
      {
        props.photos.map(photo => {
          return (
            <PhotoListItem
              key={photo.id}
              id={photo.id}
              url={photo.url}
              onPhotoClick={props.onPhotoClick}
            />
          )
        })
      }
    </div>
  )
}

export default PhotoList