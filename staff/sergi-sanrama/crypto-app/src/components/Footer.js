import React, { Component } from 'react'
import './styles/Footer.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Footer extends Component {

    constructor(props) {
        super(props)
        this.state = {
          modal: false
        };
    
        this.toggle = this.toggle.bind(this)
      }
    
      toggle() {
        this.setState({
          modal: !this.state.modal
        })  
      }

    render() {
        return (
            
            <footer className="page-footer font-small stylish-color-dark pt-4">
                <div className="container text-center text-md-left">
                    <div className="footer-copyright text-center py-3 footer-text">
                    <em>© 2018 SKYLAB PROJECT </em>&nbsp;&nbsp;&nbsp;
                            <Button onClick={this.toggle}>{this.props.buttonLabel}<img src='images/icon_bitcoin.png' /></Button>
                            &nbsp;&nbsp;&nbsp; <em>WITH ♥ BY SERGI SANRAMA</em>
                            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                
                                <ModalBody className='modal-style'>
                                {/* <abbr title="World Health Organization">WHO</abbr> */}
                                Tips are welcome ;)<br/><br/>You can send BTC to this address: <br/><br/>3KG7mENGbbiXVQEu9dPnv6UbTXZmv34sHM<br/><br/> Or scan this QR:<br/><br/>
                                    <img id='qr_btc' src='images/qr_btc.png'></img>
                                    <br/><br/>
                                </ModalBody>
                                <ModalFooter className='modal-style'>
                                    <Button color="secondary" onClick={this.toggle}>Done</Button>{' '}    
                                </ModalFooter>
                            </Modal>                        
                    </div>
                </div>
            </footer>
        )
    }
}


export default Footer