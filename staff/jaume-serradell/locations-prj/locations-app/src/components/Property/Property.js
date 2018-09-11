import React, { Component } from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import swal from 'sweetalert';
import './Property.css'

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

    onTitleChanged = e => this.setState({ title: e.target.value })
    onSubtitleChanged = e => this.setState({ subtitle: e.target.value })
    onDescriptionChanged = e => this.setState({ description: e.target.value })
    onTypeChanged = e => this.setState({ type: e.target.value })
    onPhotoChanged = e => this.setState({ photo: e.target.value })

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
                        <div class="form-group">
                            <input type="text" className="form-control" placeholder="Property Subtitle" onChange={this.onSubtitleChanged} value={this.state.subtitle} />
                        </div>
                        <div class="form-group">
                            <input type="text" className="form-control" placeholder="Photo" onChange={this.onPhotoChanged} value={this.state.photo} />
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" rows="3" placeholder="Property Description" onChange={this.onDescriptionChanged} value={this.state.description}></textarea>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Type of Space</label>
                            <select className="form-control text-muted" onChange={this.onTypeChanged} value={this.state.type}>
                                <option selected>Choose...</option>
                                <option name="Penthouse">Penthouse</option>
                                <option name="Houses">Houses</option>
                                <option name="Events Spaces">Events Spaces</option>
                                <option name="Singular Spaces">Singular Spaces</option>
                                <option name="Loft">Loft</option>
                                <option name="Flats">Flats</option>
                            </select>
                        </div>
                       {!editId ? <button type="submit" className="btn btn-success">Add Property</button> : <button type="submit" className="btn btn-success">Update Property</button> }
                    </div>
                    <div className="col-1"></div>
                    <div className="col-6">
                        <h4>Events</h4>
                        <div className="rowEvents">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="Events" type="checkbox" checked={this.state.categories.includes('Events')} onChange={this.onCheckboxChanged} />
                                <label className="form-check-label">Events</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="Films" type="checkbox" checked={this.state.categories.includes('Films')} onChange={this.onCheckboxChanged} />
                                <label className="form-check-label">Films</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="Shootings" type="checkbox" checked={this.state.categories.includes('Shootings')} onChange={this.onCheckboxChanged} />
                                <label className="form-check-label">Shootings</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="Movies" type="checkbox" checked={this.state.categories.includes('Movies')} onChange={this.onCheckboxChanged} />
                                <label className="form-check-label">Movies</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="Spots" type="checkbox" checked={this.state.categories.includes('Spots')} onChange={this.onCheckboxChanged} />
                                <label className="form-check-label">Spots</label>
                            </div>
                        </div>
                        <h4>Categories</h4>
                        <div className="row rowEvents">
                            <div className="col">
                                <div className="form-check">
                                    <input className="form-check-input" name="Balcony" type="checkbox" checked={this.state.categories.includes('Balcony')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label">Balcony</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Bathroom" type="checkbox" checked={this.state.categories.includes('Bathroom')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label">Bathroom</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Kitchen" type="checkbox" checked={this.state.categories.includes('Kitchen')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label">Kitchen</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Dinning Room" type="checkbox" checked={this.state.categories.includes('Dinning Room')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label">Dinning Room</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Office" type="checkbox" checked={this.state.categories.includes('Office')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label">Office</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Views City" type="checkbox" checked={this.state.categories.includes('Views City')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label">Views City</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-check">
                                    <input className="form-check-input" name="Classic Style" type="checkbox" checked={this.state.categories.includes('Classic Style')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label">Classic Style</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Forest Views" type="checkbox" checked={this.state.categories.includes('Forest Views')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label">Forest Views</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Modern Style" type="checkbox" checked={this.state.categories.includes('Modern Style')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label">Modern Style</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Parking" type="checkbox" checked={this.state.categories.includes('Parking')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label">Parking</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Garden" type="checkbox" checked={this.state.categories.includes('Garden')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label">Garden</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Pool" type="checkbox" checked={this.state.categories.includes('Pool')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label">Pool</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-check">
                                    <input className="form-check-input" name="Elevator" type="checkbox" checked={this.state.categories.includes('Elevator')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label">Elevator</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Sea Views" type="checkbox" checked={this.state.categories.includes('Sea Views')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label">Sea Views</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Living Room" type="checkbox" checked={this.state.categories.includes('Living Room')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label">Living Room</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Industrial" type="checkbox" checked={this.state.categories.includes('Industrial')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label">Industrial</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Wood Floor" type="checkbox" checked={this.state.categories.includes('Wood Floor')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label">Wood Floor</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Terrace" type="checkbox" checked={this.state.categories.includes('Terrace')} onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label">Terrace</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    }
}

export default withRouter(Property)