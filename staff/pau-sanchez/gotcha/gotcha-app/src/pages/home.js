import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import FormErrors from '../components/formerrors'
import Navbars from '../components/Navbar'
import { Button, Input, InputGroup, InputGroupAddon, Col, Container , FormGroup } from 'reactstrap';

class Home extends Component {
    
    state = {
        url: '',
        notebookTitle: '',
        formErrors: {url: ''},
        urlValid: false,
        formValid: false
    }

    handleTitle = e => {
        this.state.notebookTitle = e.target.value
    }

    validateField = e => {
        const seturl = e.target.value
        
        let fieldValidationErrors = this.state.formErrors;
        let urlValid = this.state.urlValid;
        
        
        urlValid = seturl.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/)
        console.log(urlValid)
        
        fieldValidationErrors.url = urlValid ? '' : 'invalid youtube url';
        this.setState({url: seturl})
        this.setState({formErrors: fieldValidationErrors,
                urlValid: urlValid}, this.validateForm)   
        }

    validateForm = () => this.setState({formValid: this.state.urlValid})

    landingurl = e => this.setState({ url: e.target.value })

    gotoHomeEditor = () => {
        const {url, notebookTitle} = this.state
        sessionStorage.setItem('homeNotebookTitle', notebookTitle)
        sessionStorage.setItem('homeUrl', url)
        sessionStorage.setItem('origin', 'home')
        this.props.history.push('/editor')
    }

    gotoNotebooks = e => {
        e.preventDefault()
        this.props.history.push('/notebooks')
    }

    gotoNotes = e => {
        e.preventDefault()
        this.props.history.push('/notes')
    }
    
    
    
    
    render() {
        return (
            <div >
                
                <Navbars />
                    <Container>
                        <div className='home_options' >
                            <Button onClick={this.gotoNotebooks} size="lg">NOTEBOOKS</Button>
                            
                        </div>
                        <hr/>
                        <div className='home_options' >
                            <Button onClick={this.gotoNotes} size="lg">NOTES</Button>
                            
                        </div>
                        <hr/>
                        <div className='home_options'>
                            <p>Create a new notebook</p>
                                <InputGroup >
                                    <Input type='text' name='notetitle' placeholder='Add a title to your new Notebook' onChange={this.handleTitle} required/>
                                    <Input type='text' name='url' placeholder='youtube.com...' onChange={this.validateField} required/>
                                    <InputGroupAddon addonType='append'>
                                        <Button onClick={this.gotoHomeEditor} disabled={!this.state.formValid} >GO</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            <FormErrors formErrors={this.state.formErrors} />

                        </div>
                    </Container>
                
            </div>
        )
    }
}

                                
                               
export default withRouter(Home) 
                               

                        


                



                

