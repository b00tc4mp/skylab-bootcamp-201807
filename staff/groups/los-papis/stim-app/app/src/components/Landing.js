import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import swal from 'sweetalert2'
import '../styles/styles.css'
import logic from "../logic";
import "../styles/style-landing.css"
import images from "../images/logo-steam.png"

class Landing extends Component {
  state = {
    modal: false,
    modalLogin: false,
    username: "",
    password: ""
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      username: "",
      password: ""
    });
  };

  loginToggle = () => {
    this.setState({
      modalLogin: !this.state.modalLogin,
      username: "",
      password: ""

    });
  };

  keepUsername = (e) => {

    this.setState({
      username: e.target.value
    })

  }

  keepPassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleRegisterSubmit = (username,password) => {
      return logic.registerUser(username,password)
      .then(() => swal({
        title: 'Success!',
        text: 'Register Sucessful',
        type: 'success',
        confirmButtonText: 'Cool'
      }))
      .catch((err) => swal({
        title: 'Failed!',
        text: err,
        type: 'error',
        confirmButtonText: 'Try again'
      }))

  }

  handleLoginSubmit = (username,password) =>{
    logic.loginUser(username,password)
    .then(() => swal({
      title: 'Success!',
      text: 'Register Sucessful',
      type: 'success',
      confirmButtonText: 'Cool'
    }))
    .then(res => this.props.updateLoggedIn())
    .catch((err) => swal({
      title: 'Failed!',
      text: err,
      type: 'error',
      confirmButtonText: 'Try again'
    }))


  }

  render() {
    console.log("RENDER");
    return (
      <div className="container">
        
      
      <div className="container-fluid ">
        <img id="logo-landing" src={images}/>
        <p  className="row text-center justify-content-center">Stim is a web created by fans of videogames.Here, you'll be able to read news of<br/> your favourite games. We are wating for you.</p>
        <div className="row text-center justify-content-center">
        
        <Button className="" color="danger" onClick={this.toggle}>
          Register
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <form onSubmit={(e) => { 
            e.preventDefault()
            this.handleRegisterSubmit(this.state.username,this.state.password)}}>
          <ModalBody >
              <input type="text" placeholder="User name" value={this.state.username} onChange={this.keepUsername} />
              <input type="password" placeholder="Password" value={this.state.password} onChange={this.keepPassword} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary">
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
          </form>
        </Modal>
        <Button className="" color="danger" onClick={this.loginToggle}>
          Log In
        </Button>
        <Modal
          isOpen={this.state.modalLogin}
          toggle={this.loginToggle}>
          <ModalHeader toggle={this.loginToggle}>Login</ModalHeader>
          <form onSubmit={(e)=>{
            e.preventDefault()
            this.handleLoginSubmit(this.state.username, this.state.password)}
            }>
          <ModalBody >
              <input type="text" placeholder="User name" value={this.state.username} onChange={this.keepUsername} />
              <input type="password" placeholder="Password" value={this.state.password} onChange={this.keepPassword} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" >
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={this.loginToggle}>
              Cancel
            </Button>
          </ModalFooter>
          </form>
        </Modal>
        </div>
      </div>
      </div>
    );
  }
}

export default Landing;