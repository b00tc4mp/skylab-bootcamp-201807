import React, { Component } from 'react'
import Alert from 'react-s-alert'
import Loader from 'react-loader'
import Autocomplete from '../maps/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
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
        loaded: true,
        loggedIn: logic.loggedIn,
        name: null,
        surnames: null,
        birthday: null,
        gender: null,
        longitude: null,//2.173403, // Default: Barcelona
        latitude: null,//41.385064,
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

    keepGender = e => this.setState({gender: e.target.value})

    onKeepLocation = (latitude, longitude) => this.setState({ latitude, longitude })

    keepPhoto = e => {
        e.preventDefault()

        this.setState({loading: true})
        this.setState({photoFile: e.target.files[0]}, () => this.uploadProfilePhoto())
    }

    uploadProfilePhoto = () => this.props.onUploadProfilePhoto(this.state.photoFile)
    
    submitUpload = e => {
        e.preventDefault()

        const { name, surnames, birthday, gender, longitude, latitude } = this.state

        const data = {}
        if (name) data.name = name
        if (surnames) data.surnames = surnames
        if (birthday) data.birth = (new Date(birthday)).toISOString()
        if (gender) data.gender = gender
        if (longitude) data.longitude = longitude
        if (latitude) data.latitude = latitude

        if (!(Object.keys(data).length === 0 && data.constructor === Object))
        this.userUpload(data)
    }

    userUpload = (data) => {
        this.setState({ loaded: false })

		logic.uploadUser(data)
            .then(() => logic.getPrivateUser() )
            .then(() => Alert.success('Your profile was updated successfully!', { position: 'top-right', timeout: 3000 }))
            .catch(({ message }) => Alert.error(message, { position: 'bottom-right', effect: 'slide', timeout: 3000 }))
            .finally(() => this.setState({ loaded: true }))
	}
    

    render() {
        const { loggedIn, loading, photoUrl, loaded } = this.state

        return (
            <section >
                <Loader loaded={loaded}>
                    <div className="profile-logout">
                        <h1 className="profile-heading">Your profile</h1>
                        {loggedIn && <button className="profile-btn" onClick={this.props.onLogout}>LogOut</button> }
                    </div>

                    <div className="profile-form-container profile-photo-container">
                        <div>
                            <div className="form-group row">
                                {photoUrl?
                                    <Avatar alt="profile photo" style={{ height: '120px', width: '120px', alignSelf: 'center' }} src={photoUrl} className="photo" /> : 
                                    <i className="material-icons md-36">face</i>
                                }
                                <div className="profile-photo-description">
                                    <h5>Change your image profile here</h5>
                                    <p>People will recognise you by this photo. Only .jpg or .png format is accepted</p>
                                </div>
                                <div className="button-wrapper">
                                    <Button style={{ alignSelf: 'center', 
                                                    position: 'relative', 
                                                    backgroundColor: '#E0F7FA', 
                                                    color:'#0097A7', 
                                                    boxShadow: 'none', 
                                                    textTransform: 'lowercase',
                                                    border: '1px solid #0097A7'
                                                    }} 
                                            variant="extendedFab" 
                                            component="label"
                                            disabled={loading} >
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
                                        <input onChange={this.keepBirthday} type="date" className="form-control" />
                                    </div>
                                </div>

                                <div className="form-group row profile-form-gender">
                                    <label className="col-sm-2 col-form-label">Gender:</label>
                                    <div className="col-sm-10">
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input onChange={this.keepGender} className="form-check-input" type="radio" name="genderRadioBtn" value="female" /> female
                                            </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input onChange={this.keepGender} className="form-check-input" type="radio" name="genderRadioBtn" value="male" /> male
                                            </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input onChange={this.keepGender} className="form-check-input" type="radio" name="genderRadioBtn" value="other" /> other
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
                        </div>
                        <div>
                            <button type="submit" className="profile-btn profile-btn-save">Save</button>
                        </div>
                    </form>
                </Loader>
            </section>            
        )
    }
}

export default withRouter(Profile)