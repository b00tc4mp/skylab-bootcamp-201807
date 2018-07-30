import React, { Component } from 'react'

import './styles/Gallery.css'

import logic from '../logic'

class Gallery extends Component {

    state = {
        images: []
    }

    componentDidMount = () => {
        logic.retrieveImages()
            .then(res => this.setState({images: res}))
    }

    render() {

        return (
            <div className="gallery">
                {this.state.images.map( image => <img src={image} /> )}
            </div>
        )
    }
}

export default Gallery