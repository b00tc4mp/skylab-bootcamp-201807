import React, { Component } from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import swal from 'sweetalert';
import './Property.css'
import FileBase64 from "react-file-base64";

const initialState = {
    title: '',
    subtitle: '',
    description: '',
    photo: '',
    categories: [],
    type: ''
}
class Property extends Component {

    componentDidMount() {
        const { editId } = this.props
        editId && logic.retrieveProperty(editId).then(data => data.property).then(property => this.setState(property))
    }

    state = initialState

    getFiles = files => {
        this.uploadPropertyPhoto(files.base64)
    }

    uploadPropertyPhoto(photo) {
        logic.uploadPropertyPhoto(photo)
            .then(photo => {
                this.setState({ photo })
            })
            .catch(({ message }) => {
                swal({
                    type: 'error',
                    title: `${message}`,
                })
            })
    }

    onTitleChanged = e => this.setState({ title: e.target.value })
    onSubtitleChanged = e => this.setState({ subtitle: e.target.value })
    onDescriptionChanged = e => this.setState({ description: e.target.value })
    onTypeChanged = e => this.setState({ type: e.target.value })
    // onPhotoChanged = e => this.setState({ photo: e.target.value })

    onCheckboxChanged = e => {
        const checked = e.target.checked
        const name = e.target.name
        const categories = this.state.categories

        if (checked) {
            categories.push(name)
        }
        else {
            const pos = categories.indexOf(name)
            categories.splice(pos, 1)
        }

        this.setState({ categories })
    }

    onPropertySubmitted = e => {
        e.preventDefault()
        const { email, token, editId, goEdit } = this.props

        const { title, subtitle, description, photo, categories, type } = this.state

        !editId ? logic.addProperty(email, title, subtitle, photo, description, categories, type, token)
            .then(() => this.setState({
                title: '',
                subtitle: '',
                description: '',
                photo: '',
                type: '',
                categories: [],
            }))
            .then(() =>
                swal({
                    title: "Property created succefully",
                    icon: "success"
                }))
            .then(() => this.props.history.push('/'))
            .catch(({ message }) =>
                swal({
                    title: message,
                    icon: "error",
                })
            ) : logic.updatePropertyById(editId, email, token, title, subtitle, description, photo, categories, type).then(() => {
                this.setState({ ...initialState, categories: [] }, () =>{
                    return swal({
                        title: "Property updated succefully",
                        icon: "success"
                    }).then(() => goEdit())
                })
            })
    }

    render() {
        const { editId } = this.props
        return <div className="container">
            <form className="form" onSubmit={this.onPropertySubmitted}>
                <div className="row">
                    <div className="col-5">
                        <h4>Property</h4>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Property Title" onChange={this.onTitleChanged} value={this.state.title} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Property Subtitle" onChange={this.onSubtitleChanged} value={this.state.subtitle} />
                        </div>
                        <div className="form-group editedForm">
                            <FileBase64 className="input" multiple={false} onDone={this.getFiles} />
                            <div className="form-group">
                                {this.state.photo ? <img className="img-fluid editedImg" alt={this.state.title} src={this.state.photo}></img> : ""}
                            </div>
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" rows="3" placeholder="Property Description" onChange={this.onDescriptionChanged} value={this.state.description}></textarea>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Type of Space</label>
                            <select className="form-control text-muted" onChange={this.onTypeChanged} value={this.state.type}>
                                <option defaultValue>Choose...</option>
                                <option value="Penthouse" name="Penthouse">Penthouse</option>
                                <option value="Houses" name="Houses">Houses</option>
                                <option value="Events Spaces" name="Events Spaces">Events Spaces</option>
                                <option value="Singular Spaces" name="Singular Spaces">Singular Spaces</option>
                                <option value="Loft" name="Loft">Lofts</option>
                                <option value="Flats" name="Flats">Flats</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-6">
                        <h4>Events</h4>
                        <div className="rowEvents">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="Events" type="checkbox" id="Events" checked={this.state.categories.includes('Events')} onChange={this.onCheckboxChanged} />
                                <label className="form-check-label" htmlFor="Events">Events</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="Shootings" type="checkbox" id="Shootings" checked={this.state.categories.includes('Shootings')} onChange={this.onCheckboxChanged} />
                                <label className="form-check-label" htmlFor="Shootings">Shootings</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="Movies" type="checkbox" id="Movies" checked={this.state.categories.includes('Movies')} onChange={this.onCheckboxChanged} />
                                <label className="form-check-label" htmlFor="Movies">Movies</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="Spots" type="checkbox" id="Spots" checked={this.state.categories.includes('Spots')} onChange={this.onCheckboxChanged} />
                                <label className="form-check-label" htmlFor="Spots">Spots</label>
                            </div>
                        </div>
                        <h4>Categories</h4>
                        <div className="row rowEvents">
                            <div className="col">
                                <div className="form-check">
                                    <input className="form-check-input" name="Balcony" id="Balcony" type="checkbox" checked={this.state.categories.includes('Balcony')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" htmlFor="Balcony">Balcony</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Bathroom" id="Bathroom" type="checkbox" checked={this.state.categories.includes('Bathroom')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" htmlFor="Bathroom">Bathroom</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Kitchen" id="Kitchen" type="checkbox" checked={this.state.categories.includes('Kitchen')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" htmlFor="Kitchen">Kitchen</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Dinning Room" id="Dinning Room" type="checkbox" checked={this.state.categories.includes('Dinning Room')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" htmlFor="Dinning Room">Dinning Room</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Office" id="Office" type="checkbox" checked={this.state.categories.includes('Office')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" htmlFor="Office">Office</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Views City" id="Views City" type="checkbox" checked={this.state.categories.includes('Views City')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" htmlFor="Views City">Views City</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-check">
                                    <input className="form-check-input" name="Classic Style" id="Classic Style" type="checkbox" checked={this.state.categories.includes('Classic Style')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" htmlFor="Classic Style">Classic Style</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Forest Views" id="Forest Views" type="checkbox" checked={this.state.categories.includes('Forest Views')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" htmlFor="Forest Views">Forest Views</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Modern Style" id="Modern Style" type="checkbox" checked={this.state.categories.includes('Modern Style')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" htmlFor="Modern Style">Modern Style</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Parking" id="Parking" type="checkbox" checked={this.state.categories.includes('Parking')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" htmlFor="Parking">Parking</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Garden" id="Garden" type="checkbox" checked={this.state.categories.includes('Garden')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" htmlFor="Garden">Garden</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Pool" id="Pool" type="checkbox" checked={this.state.categories.includes('Pool')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" htmlFor="Pool">Pool</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-check">
                                    <input className="form-check-input" name="Elevator" id="Elevator" type="checkbox" checked={this.state.categories.includes('Elevator')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" htmlFor="Elevator">Elevator</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Sea Views" id="Sea Views" type="checkbox" checked={this.state.categories.includes('Sea Views')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" htmlFor="Sea Views">Sea Views</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Living Room" id="Living Room" type="checkbox" checked={this.state.categories.includes('Living Room')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" htmlFor="Living Room">Living Room</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Industrial" id="Industrial" type="checkbox" checked={this.state.categories.includes('Industrial')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" htmlFor="Industrial">Industrial</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Wood Floor" id="Wood Floor" type="checkbox" checked={this.state.categories.includes('Wood Floor')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" htmlFor="Wood Floor">Wood Floor</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Terrace" id="Terrace" type="checkbox" checked={this.state.categories.includes('Terrace')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" htmlFor="Terrace">Terrace</label>
                                </div>
                            </div>
                        </div>
                        {!editId ? <button type="submit" className="btn btn-success mt-3">Add Property</button> : <button type="submit" className="btn btn-success">Update Property</button> }
                    </div>
                </div>
            </form>
        </div>
    }
}

export default withRouter(Property)