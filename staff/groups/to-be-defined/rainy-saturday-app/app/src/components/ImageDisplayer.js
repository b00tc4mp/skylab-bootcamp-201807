import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResultImage from './ResultImage';
import './ImageDisplayer.css'

class ImageDisplayer extends Component {

render(){

  let ExtractData = this.props.data.map(imageurl => {
    return (
      <ResultImage image={imageurl} />
  
    )
  })

  return (
    <div class="flex-container">
      {ExtractData}
    </div>
  )
}



}

export default ImageDisplayer