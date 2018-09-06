import React, { Component } from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import swal from 'sweetalert';
import './Property.css'


class Property extends Component {
    state = {
        title: '',
        subtitle: '',
        description: '',
        photo: '',
        categories: [],
        type: ''
    }

    onTitleChanged = e => this.setState({ title: e.target.value })
    onSubtitleChanged = e => this.setState({ subtitle: e.target.value })
    onDescriptionChanged = e => this.setState({ description: e.target.value })
    onTypeChanged = e => this.setState({ type: e.target.value })
    onPhotoChanged = e => this.setState({ photo: e.target.value })

    onCheckboxChanged = e => {
        const checked = e.target.checked
        const name = e.target.name
        const categories = this.state.categories

        if(checked) {
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
        const {email, token} = this.props

        const { title, subtitle, description, photo, categories, type } = this.state

        logic.addProperty(email, title, subtitle, photo, description, categories, type, token)
            .then(() => this.setState({
                title: '',
                subtitle: '',
                description: '',
                photo: '',
                type: '',
                categories: []
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
            )
    }

    render() {

        return <div className="container">
            <form className="form" onSubmit={this.onPropertySubmitted}>
                <div className="row">
                    <div className="col-5">
                        <h4>Add Property</h4>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Property Title" onChange={this.onTitleChanged} />
                        </div>
                        <div class="form-group">
                            <input type="text" className="form-control" placeholder="Property Subtitle" onChange={this.onSubtitleChanged}/>
                        </div>
                        <div class="form-group">
                            <input type="text" className="form-control" placeholder="Photo" onChange={this.onPhotoChanged}/>
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" rows="3" placeholder="Property Description" onChange={this.onDescriptionChanged}></textarea>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Type of Space</label>
                            <select className="form-control text-muted" onChange={this.onTypeChanged}>
                                <option selected>Choose...</option>
                                <option name="Penthouse">Penthouse</option>
                                <option name="Houses">Houses</option>
                                <option name="Events Spaces">Events Spaces</option>
                                <option name="Singular Spaces">Singular Spaces</option>
                                <option name="Loft">Loft</option>
                                <option name="Flats">Flats</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-success">Add Property</button>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-6">
                        <h4>Add Events</h4>
                        <div className="rowEvents">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="Events" type="checkbox" id="inlineCheckbox1" value="option1" onChange={this.onCheckboxChanged} />
                                <label className="form-check-label" for="inlineCheckbox1">Events</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="Films" type="checkbox" id="inlineCheckbox2" value="option2" onChange={this.onCheckboxChanged} />
                                <label className="form-check-label" for="inlineCheckbox2">Films</label> 
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="Shootings" type="checkbox" id="inlineCheckbox3" value="option3" onChange={this.onCheckboxChanged} />
                                <label className="form-check-label" for="inlineCheckbox3">Shootings</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="Movies" type="checkbox" id="inlineCheckbox4" value="option4" onChange={this.onCheckboxChanged} />
                                <label className="form-check-label" for="inlineCheckbox4">Movies</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="Spots" type="checkbox" id="inlineCheckbox5" value="option5" onChange={this.onCheckboxChanged} />
                                <label className="form-check-label" for="inlineCheckbox5">Spots</label>
                            </div>
                        </div> 
                        <h4>Add Categories</h4>
                        <div className="row rowEvents">
                            <div className="col">
                                <div className="form-check">
                                    <input className="form-check-input" name="Balcony" type="checkbox" id="inlineCheckbox1" value="option1" onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" for="inlineCheckbox1">Balcony</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Bathroom" type="checkbox" id="inlineCheckbox2" value="option2" onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" for="inlineCheckbox2">Bathroom</label> 
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Kitchen" type="checkbox" id="inlineCheckbox3" value="option3" onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" for="inlineCheckbox3">Kitchen</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Dinning room" type="checkbox" id="inlineCheckbox4" value="option4" onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" for="inlineCheckbox4">Dinning room</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Office" type="checkbox" id="inlineCheckbox5" value="option5" onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" for="inlineCheckbox5">Office</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Views City" type="checkbox" id="inlineCheckbox5" value="option5" onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" for="inlineCheckbox5">Views City</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-check">
                                    <input className="form-check-input" name="Clasic Style" type="checkbox" id="inlineCheckbox1" value="option1" onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" for="inlineCheckbox1">Clasic Style</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Forest Views" type="checkbox" id="inlineCheckbox2" value="option2" onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" for="inlineCheckbox2">Forest Views</label> 
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Modern Style" type="checkbox" id="inlineCheckbox3" value="option3" onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" for="inlineCheckbox3">Modern Style</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Parking" type="checkbox"onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" for="inlineCheckbox4">Parking</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Garden" type="checkbox" onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" for="inlineCheckbox5">Garden</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Office" type="checkbox" onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" for="inlineCheckbox5">Office</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-check">
                                    <input className="form-check-input" name="Pool" type="checkbox" id="inlineCheckbox1" value="option1" onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" for="inlineCheckbox1">Pool</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Sea views" type="checkbox" id="inlineCheckbox2" value="option2" onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" for="inlineCheckbox2">Sea views</label> 
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Living room" type="checkbox" id="inlineCheckbox3" value="option3" onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" for="inlineCheckbox3">Living room</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Industrial floor" type="checkbox" id="inlineCheckbox4" value="option4" onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" for="inlineCheckbox4">Industrial floor</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Wood floor" type="checkbox" id="inlineCheckbox5" value="option5" onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" for="inlineCheckbox5">Wood floor</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="Terrace / Exterior Zone" type="checkbox" id="inlineCheckbox5" value="option5" onChange={this.onCheckboxChanged} />
                                    <label className="form-check-label" for="inlineCheckbox5">Terrace</label>
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