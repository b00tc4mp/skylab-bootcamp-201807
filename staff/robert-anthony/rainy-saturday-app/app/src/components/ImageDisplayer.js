import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResultImage from './ResultImage';
import './ImageDisplayer.css'

class ImageDisplayer extends Component {


  static propTypes = {
    data: PropTypes.array.isRequired
  }

  render() {
    let dataKey = 0
    let ExtractData = this.props.data.map(imageurl => {
      dataKey++
      return (
        <ResultImage image={imageurl} key={dataKey} />


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