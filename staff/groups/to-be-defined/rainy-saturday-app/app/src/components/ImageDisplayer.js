import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResultImage from './ResultImage';
import './ImageDisplayer.css'


class ImageDisplayer extends Component {


  static propTypes = {
    data: PropTypes.array.isRequired
  }


  onImageClicked = () => {
    console.log("hola")
  }

  render() {
    let incKey = 0
    // const that = this
    console.log("image displayer this.props.data",this.props.data)

    let ExtractData = this.props.data.map(imageData => {
      return (
        <ResultImage image={imageData} key={imageData.longTitle + imageData.id} onImageClick={this.onImageClicked} />

      )
    })
    return (
      <div className="flex-container">
        {ExtractData}
      </div>
    )
  }



}

export default ImageDisplayer
