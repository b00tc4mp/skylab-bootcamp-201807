import React, { Component } from 'react'
import GoogleMapsContainer from '../cards/GoogleMapsContainer'
import Autocomplete from '../maps/Autocomplete'
import logic from '../../logic'
import './Upload.css'
import { withRouter } from 'react-router-dom'

import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'


import ImageUploader from 'react-images-upload'

const mapContainerStyle = {
    height: '510px',
    position: 'relative',
    width: '100%',
    border: '1px solid #ced4da',
    borderRadius: '.45rem'
  }


class Upload extends Component {
    state = {
        title: null,
        cathegory: 'general',
        price: null,
        description: null,
        longitude: 2.173403, // Default: Barcelona
        latitude: 41.385064,
        //errorMsg: null,
        //showFeedback: false,
        pictures: []
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

    keepPhoto = picture => this.setState({ pictures: this.state.pictures.concat(picture) })

    onKeepLocation = (latitude, longitude) => this.setState({ latitude, longitude })

    submitUpload = e => {
        e.preventDefault()

        const { title, cathegory, price, description, pictures, longitude, latitude } = this.state

        this.props.onProductUpload(title, cathegory, price, description, pictures, longitude, latitude)

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
                                <option label="Clothes">clothes</option>
                                <option label="Books">books</option>
                                <option label="IT">it</option>
                                <option label="Car">car</option>
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
                            <ImageUploader
                                withPreview={true}
                                withIcon={false}
                                buttonText='Choose images'
                                onChange={this.keepPhoto}
                                imgExtension={['.jpg', '.jpeg']}
                                maxFileSize={5242880}
                                label={'Choose until 4 images Max file size: 5mb, accepted: jpg'}
                                fileContainerStyle={{
                                    width: '170px',
                                    margin: '10px',
                                    boxShadow: 'none'
                                  }}
                            />
                        </div>
                    </div>

                    <div className="upload-container upload-map-field-container">
                        <h2 className="upload-title">Map</h2>
                        <div className="upload-map-container">
                            <Autocomplete mapContainerStyle={mapContainerStyle} keepLocation={this.onKeepLocation} />
                        </div>                        
                    </div>

                    <button type="submit" className="btn btn-primary">Upload Product</button>
                </form>
            </section>
        )
    }
}

export default withRouter(Upload)