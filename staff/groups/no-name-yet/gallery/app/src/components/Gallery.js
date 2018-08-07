import React, { Component } from 'react'

import './styles/Gallery.css'

import logic from '../logic'

class Gallery extends Component {

    state = {
        images: logic._userImages
    }
    
    /** This function delete an image
     * @param {string} id - The image id
     */
    deleteImage = id => {
        logic.deleteImage(id)
            .then(() => this.setState({ images: logic._userImages }))
    }

    render() {
        const { deleteImage } = this
        return (
            <div className="gallery">
                {this.state.images.map(({ id, url }) => {
                    return (
                        <div className="gallery__container">
                            <img src={url} alt="" key={id} className="gallery__img" />
                            <i onClick={() => deleteImage(id)} className="far fa-trash-alt gallery__icon"></i>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Gallery