import React, { Component } from 'react'
import Autocomplete from '../maps/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
//import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';

//import ImageUploader from 'react-images-upload'

import logic from '../../logic'
import './Profile.css'
import { withRouter } from 'react-router-dom'


const mapContainerStyle = {
    height: '250px',
    position: 'relative',
    width: '100%',
    border: '1px solid #ced4da',
    borderRadius: '.45rem'
  }

class Profile extends Component {
    
    state = {
        loggedIn: logic.loggedIn,
        name: null,
        surnames: null,
        birthday: null,
        longitude: 2.173403, // Default: Barcelona
        latitude: 41.385064,
        photoFile: null,
        photoUrl: null,
        loading: false,
    }

    static getDerivedStateFromProps(props, state) {
        if (props.profilePhoto !== state.photoUrl && state.loading) 
          return { photoUrl: props.profilePhoto, loading: false }
    
        return null; // Return null to indicate no change to state.
    }

    componentDidMount() {
        this.getProfilePhoto()
    }

    getProfilePhoto = () => {
        const photoUrl = logic.getUserField('photo')

        if (logic.loggedIn && photoUrl)
            this.setState({ photoUrl })
    }

    keepName = e => this.setState({name: e.target.value})

    keepSurname = e => this.setState({surnames: e.target.value})

    keepBirthday = e => this.setState({birthday: e.target.value})

    onKeepLocation = (latitude, longitude) => this.setState({ latitude, longitude })

    keepPhoto = e => {
        e.preventDefault()

        this.setState({loading: true})
        this.setState({photoFile: e.target.files[0]}, () => this.uploadProfilePhoto())
    }

    uploadProfilePhoto = () => this.props.onUploadProfilePhoto(this.state.photoFile)

    //handleButtonClick = () => this.setState({loading: true})

    /*
    submitUpload = e => {
        e.preventDefault()

        const { title, cathegory, price, description, pictures, longitude, latitude } = this.state

        this.props.onProductUpload(title, cathegory, price, description, pictures, longitude, latitude)

    }*/

    

    render() {
        const { loggedIn, loading, photoUrl } = this.state

        return (
            <section >

                {loggedIn && <button className="" onClick={this.props.onLogout}>LogOut</button> }


                <div className="profile-form-container profile-photo-container">
                    <div>
                        <div className="form-group row">
                            {photoUrl?
                                <Avatar alt="profile photo" style={{ height: '120px', width: '120px', alignSelf: 'center' }} src={photoUrl} className="photo" /> : 
                                <i className="material-icons md-36">face</i>
                            }
                            <div className="profile-photo-description">
                                <h5>Change your image profile here</h5>
                                <p>People will recognise you by this photo. Only .jpg format is accepted</p>
                            </div>
                            <div className="button-wrapper">
                                <Button style={{ alignSelf: 'center', position: 'relative' }} variant="extendedFab" component="label" color="primary" disabled={loading} >
                                    {'Upload your photo'}
                                    <input onChange={this.keepPhoto} type="file" accept="jpg|jpeg"/>
                                </Button>
                                {loading && <CircularProgress size={24} className="button-progress"/>}
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={this.submitUpload} className="profile-form-container">
                    <div>

                        <div className="profile-info-container">

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Name:</label>
                                <div className="col-sm-10">
                                    <input onChange={this.keepName} type="text" className="form-control" placeholder="Name" maxLength="20"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Surnames:</label>
                                <div className="col-sm-10">
                                    <input onChange={this.keepSurame} type="text" className="form-control" placeholder="Surnames" maxLength="20"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Birth date:</label>
                                <div className="col-sm-10">
                                    <input onChange={this.keepBirthday} type="date" value="2011-08-19" className="form-control" />
                                </div>
                            </div>

                            <div className="form-group row profile-form-gender">
                                <label className="col-sm-2 col-form-label">Gender:</label>
                                <div className="col-sm-10">
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="radio" name="genderRadioBtn" value="female" /> female
                                        </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="radio" name="genderRadioBtn" value="male" /> male
                                        </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="radio" name="genderRadioBtn" value="other" /> other
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="profile-field-map-container">
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Product's location:</label>
                                <div className="col-sm-10">
                                    <div className="profile-map-container">
                                        <Autocomplete mapContainerStyle={mapContainerStyle} keepLocation={this.onKeepLocation}/>
                                    </div>
                                </div>
                            </div>                    
                        </div>
                        
                            {/*errorMsg && <Message success={false} text={this.props.errorMsg}/>*/}
                            {/*showFeedback && <Message success={true} text={'Your update was successful'}/>*/}

                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </section>









            
        )
    }
}

export default withRouter(Profile)



/*
<input onChange={this.keepPhoto} type="file" name="photo" id="profile-btn-photo" accept="jpg|jpeg" />
                            <label htmlFor="profile-btn-photo">
                                {<div className={classes.wrapper}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={loading}
                                        onClick={this.handleButtonClick}
                                    >
                                        Upload your photo
                                    </Button>}
                                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                </div>
                            </label>
*/

