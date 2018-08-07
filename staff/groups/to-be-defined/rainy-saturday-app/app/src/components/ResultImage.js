import React, {Component} from 'react'
// import {CardImg, Card} from 'reactstrap'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import './ResultImage.css'
import logic from '../logic'

class ResultImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      error: '',
      favorite: logic.isFavorite(this.props.image.objectNumber)
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    console.log("this.props.className",this.props.className)

    this.setState({

    modal: !this.state.modal
    });
  }




  onToggleFavorite = () => {

    const toStore = {
      objectNumber: this.props.image.objectNumber,
      imageurl: this.props.image.imageurl
    }

    logic.toggleImageFavorite(toStore)
      .then(() => {
        this.setState({favorite: logic.isFavorite(this.props.image.objectNumber)})
      })
      .catch((message) => this.setState({error: message}))
  }


  render() {
    const favorite = logic.isFavorite(this.props.image.objectNumber)
    return (
      <div>

        <img src={this.props.image.imageurl} alt={this.props.image.title} onClick={this.toggle}/>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className="resultImage-modalDialog">
         <ModalHeader toggle={this.toggle}>{this.props.image.title}</ModalHeader>
          <ModalBody>
            <img className="imageList" src={this.props.image.imageurl} alt={this.props.image.title}/>
            <h6>Title:</h6><p>{this.props.image.longTitle}</p>
            <h6>Maker:</h6><p>{this.props.image.maker}</p>
            <h6>Materials:</h6><p>{this.props.image.materials.join(", ")}</p>
            <h6>Period:</h6><p>{this.props.image.period}</p>
            <i id="resultImage-favoriteIcon" className={(favorite ? "fas fa-star fa-2x " : "far fa-star fa-2x ")}
               onClick={this.onToggleFavorite}></i>
          </ModalBody>
          <ModalFooter>

            <Button color="primary" onClick={this.toggle}>Close</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    )


  }
}

export default ResultImage