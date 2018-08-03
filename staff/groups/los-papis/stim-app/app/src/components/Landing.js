import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col
} from "reactstrap";
import swal from "sweetalert2";
import logic from "../logic";

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

  keepUsername = e => {
    this.setState({
      username: e.target.value
    });
  };

  keepPassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleRegisterSubmit = (username, password) => {
    return logic
      .registerUser(username, password)
      .then(() => {
        swal({
          title: "Success!",
          text: "Register Sucessful",
          type: "success",
          confirmButtonText: "Cool"
        });
        this.toggle();
      })

      .catch(err =>
        swal({
          title: "Failed!",
          text: err,
          type: "error",
          confirmButtonText: "Try again"
        })
      );
  };

  handleLoginSubmit = (username, password) => {
    logic
      .loginUser(username, password)
      .then(() =>
        swal({
          title: "Success!",
          text: "Login Sucessful",
          type: "success",
          confirmButtonText: "Cool"
        })
      )
      .then(res => this.props.updateLoggedIn())
      .catch(err =>
        swal({
          title: "Failed! :(",
          text: err,
          type: "error",
          confirmButtonText: "Try again"
        })
      );
  };

  render() {
    return (
      //Modals
      <div
        style={{
          background:
            "url(https://i.pinimg.com/originals/cf/e5/53/cfe553f240c06d625ee195fe8c9cb51e.jpg) no-repeat scroll 0px 100% / cover transparent"
        }}
      >
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Registration form</ModalHeader>
          <form
            onSubmit={e => {
              e.preventDefault();
              this.handleRegisterSubmit(
                this.state.username,
                this.state.password
              );
            }}
          >
            <ModalBody className="text-center">
              <div className="mb-4 ">
                <i className="fa fa-user mr-4" />
                <input
                  type="text"
                  placeholder="User name"
                  value={this.state.username}
                  onChange={this.keepUsername}
                />
              </div>
              <div className="mb-2">
                <i className="fa fa-lock mr-4" />
                <input
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.keepPassword}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
              <Button color="primary">Submit</Button>
            </ModalFooter>
          </form>
        </Modal>
        <Container
          className="text-center align-items-center"
          style={{ height: 90 + "vh" }}
        >
          <Row>
            <Col className="p-5">
              <h1>Stim App</h1>
              <h5>Get info of your favorite games in an easy way! </h5>
              <Button className="mr-5" color="primary" onClick={this.toggle}>
                Register
              </Button>
              <Button color="primary" onClick={this.loginToggle}>
                Log In
              </Button>
            </Col>
          </Row>
        </Container>
        <Modal isOpen={this.state.modalLogin} toggle={this.loginToggle}>
          <ModalHeader toggle={this.loginToggle}>Login form</ModalHeader>
          <form
            onSubmit={e => {
              e.preventDefault();
              this.handleLoginSubmit(this.state.username, this.state.password);
            }}
          >
            <ModalBody className="text-center">
              <div className="mb-4 ">
                <i className="fa fa-user mr-4" />
                <input
                  type="text"
                  placeholder="User name"
                  value={this.state.username}
                  onChange={this.keepUsername}
                />
              </div>
              <div className="mb-2 ">
                <i className="fa fa-lock mr-4" />
                <input
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.keepPassword}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.loginToggle}>
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Submit
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

export default Landing;
