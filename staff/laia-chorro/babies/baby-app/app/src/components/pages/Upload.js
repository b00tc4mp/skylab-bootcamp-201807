import React, { Component } from 'react'
import GoogleMapsContainer from '../cards/GoogleMapsContainer'
//import InputPhotoPreview from '../cards/InputPhotoPreview'
import logic from '../../logic'
import './Upload.css'
import { withRouter } from 'react-router-dom'

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


class Upload extends Component {
    state = {
        title: null,
        cathegory: 'general',
        price: null,
        description: null,
        photo: null,
        longitude: -3.703790,
        latitude: 40.416775
        //errorMsg: null,
        //showFeedback: false
    }

    /*componentDidMount() {
        this.props.hideFeedback()
    }

    static getDerivedStateFromProps(props, state) {
        if (props.errorMsg !== state.errorMsg || 
            props.showFeedback !== state.showFeedback) {
          return {
            errorMsg: props.errorMsg,
            showFeedback: props.showFeedback,
          };
        }
    
        return null; // Return null to indicate no change to state.
    }*/

    keepTitle = e => this.setState({title: e.target.value})

    keepCathegory = e => this.setState({cathegory: e.target.value})

    keepPrice = e => this.setState({price: parseFloat(e.target.value)})

    keepDescription = e => this.setState({description: e.target.value})

    keepPhoto = e => this.setState({photo: e.target.files[0]})

    submitUpload = e => {
        e.preventDefault()

        const { title, cathegory, price, description, photo, longitude, latitude } = this.state

        this.props.onProductUpload(title, cathegory, price, description, photo, longitude, latitude)
    }


    render() {
        //const {errorMsg, showFeedback} = this.state

        return (
            <section >
                <form onSubmit={this.submitUpload} className="upload-form">
                    <div className="upload-container">
                        <h2 className="upload-title">Information</h2>
                        
                        <div className="form-group">
                            <label className="">Title</label>
                            <input onChange={this.keepTitle} className="form-control" type="text" placeholder="My product" maxLength="50"/>
                        </div>

                        <div className="form-group upload-form-inline">
                            <label className="">Price</label>
                            <input onChange={this.keepPrice} className="form-control" type="number" placeholder="Some €" />
                        </div>
                        <div className="form-group upload-form-inline">
                            <label className="">Cathegory</label>
                            <select onChange={this.keepCathegory} className="form-control">
                                <option>Clothes</option>
                                <option>Books</option>
                                <option>IT</option>
                                <option>Car</option>
                            </select>
                        </div>
                            
                            {/*errorMsg && <Message success={false} text={this.props.errorMsg}/>*/}
                            {/*showFeedback && <Message success={true} text={'Your update was successful'}/>*/}
                        <div className="form-group">
                            <label className="">Description</label>
                            <textarea onChange={this.keepDescription} className="form-control" rows="5" placeholder="Tell us about your product" maxLength="650"></textarea>
                        </div>
                    </div>

                    <div className="upload-container">
                        <h2 className="upload-title">Photos</h2>
                        <div className="form-group">
                            {/*<label>File input</label>
                            <input onChange={this.keepPhoto} type="file" className="form-control-file"/>*/}
                            <input onChange={this.keepPhoto} accept="image/*" className="upload-form-photo-input" id="icon-button-file" type="file" />
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" className="upload-form-photo-button" component="span">
                                    <PhotoCamera />
                                </IconButton>
                        </label>
                        {/*<InputPhotoPreview />*/}
                        </div>
                    </div>

                    <div className="upload-container">
                        <h2 className="upload-title">Map</h2>
                        {/*<div className="form-group">*/}
                            {/*<GoogleMapsContainer/>*/}
                        {/*</div>*/}
                    </div>

                    <button type="submit" className="btn btn-primary">Upload Product</button>
                </form>
            </section>
        )
    }
}

export default withRouter(Upload)