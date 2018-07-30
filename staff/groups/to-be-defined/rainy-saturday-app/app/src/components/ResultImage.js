
import React, { Component } from 'react'
import { CardImg, Card } from 'reactstrap'

class ResultImage extends Component {

  render() {
    return (
      <div>
        <img src={this.props.image.imageurl} alt="test" />
      </div>
    )


  }
}

export default ResultImage