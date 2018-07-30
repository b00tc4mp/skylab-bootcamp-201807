import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Link} from 'react-router-dom'

class Landing extends Component {

    state = {
        modal: false || this.props.registerModal,
        modalLogin: false || this.props.modalLogin
    }

    toggle = () => {

        this.setState({
            modal: !this.state.modal,
            
        });

    }

    loginToggle = () => {

        this.setState({
            modalLogin: !this.state.modalLogin
        });

    }

    componentWillReceiveProps(nextProps){
        // console.log(Object.keys(nextProps)[0])
        debugger
        this.setState({
            [Object.keys(nextProps)[0]] : true
        })
    }

    render() {
        console.log("RENDER")
        return <div>
            <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                <ModalBody>
                    estoy en el register
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Button color="danger" onClick={this.loginToggle}>{this.props.buttonLabel}</Button>
            <Modal isOpen={this.state.modalLogin} toggle={this.loginToggle} className={this.props.className}>
                <ModalHeader toggle={this.loginToggle}>Modal title</ModalHeader>
                <ModalBody>
                    Estoy en el login
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.loginToggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.loginToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Link to="/login"> ir login </Link>
            <Link to="/register"> ir register </Link>
        </div>
    }
}

export default Landing
