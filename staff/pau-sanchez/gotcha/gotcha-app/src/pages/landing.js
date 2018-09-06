import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import FormErrors from '../components/formerrors'

class Landing extends Component {
    
    state = {
        url: '',
        formErrors: {url: ''},
        urlValid: false,
        formValid: false
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

    gotoLandingEditor = () => {
        sessionStorage.setItem('landingUrl', this.state.url)
        sessionStorage.setItem('origin', 'landing')
        this.props.history.push('/editorlanding')
    }
    
    render() {

        const {url} = this.state

        return (
            <div>
                <h1>LANDING</h1>
                <input type='text' name='url' onChange={this.validateField}/>
                <button onClick={this.gotoLandingEditor} disabled={!this.state.formValid}>GO</button>
                
                <div>
                <FormErrors formErrors={this.state.formErrors} />
                </div>
            </div>

        )
    }
}

export default withRouter(Landing)