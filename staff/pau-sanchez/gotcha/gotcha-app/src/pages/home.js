import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import FormErrors from '../components/formerrors'

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
            <div>
                <h1>HOME</h1>

                <button onClick={this.gotoNotebooks}>NOTEBOOKS</button>

                <button onClick={this.gotoNotes}>NOTES</button>

                <input type='text' name='notetitle' placeholder='Notebook title' onChange={this.handleTitle} required/>
                <input type='text' name='url' placeholder='youtube.com...' onChange={this.validateField} required/>
                <button onClick={this.gotoHomeEditor} disabled={!this.state.formValid} >GO</button>
                
                <div>
                <FormErrors formErrors={this.state.formErrors} />
                </div>
            </div>
        )
    }
}


export default withRouter(Home) 