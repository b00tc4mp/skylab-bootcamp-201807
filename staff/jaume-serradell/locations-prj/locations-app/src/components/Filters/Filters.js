import React, { Component } from 'react';
import logic from '../../logic'
import './Filters.css'
import PropertyCard from '../Cards/PropertyCard'
import swal from 'sweetalert';

class Filters extends Component {

    state = {
        properties: [],
        type: '',
        categories: []
    }

    listProperties = () => {
        logic.listPropertyByQuery()
            .then(({ properties }) => {
                this.setState({ properties })
            })
    }

    filterProperties = () => {
        return logic.listPropertyByQuery(this.state.type || undefined, this.state.categories)
            .then(({ properties }) => {
                this.setState({ properties })
            })
    }

    componentDidMount() {
        this.listProperties()
    }

    onCheckboxChanged = e => {

        const checked = e.target.checked
        const value = e.target.value
        const categories = this.state.categories

        if (checked) {
            categories.push(value)
        }
        else {
            const pos = categories.indexOf(value)
            categories.splice(pos, 1)
        }

        this.setState({ categories }, () => this.filterProperties())
    }


    onTypeChanged = e => {
        return this.setState({ type: e.target.value }, () => {
            return this.filterProperties()
        })
    }

    deleteProperty = (id) => {
        const { email, token } = this.props
        return swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this property!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        return logic.deletePropertyById(email, id, token)
                        .then(() => swal("Your property has been deleted!", {
                            icon: "success"
                        })
                        .then(() =>  this.listProperties())
                        )
                    } else {
                        swal("Your property is safe!");
                    }
                })
    }

    render() {

        const { properties } = this.state

        return <div className="container">
            <form>
                <div className="row">
                    <div className="col-4">
                        <div className="filterBox">
                            <h4>By Type:</h4>
                            <div className="form-group">
                                <select className="form-control text-muted" onChange={this.onTypeChanged} value={this.state.type}>
                                    <option selected value="all" name="all">All types</option>
                                    <option name="Penthouse">Penthouse</option>
                                    <option name="Houses">Houses</option>
                                    <option name="Events Spaces">Events Spaces</option>
                                    <option name="Singular Spaces">Singular Spaces</option>
                                    <option name="Loft">Loft</option>
                                    <option name="Flats">Flats</option>
                                </select>
                            </div>
                            <br />
                            <h4>By Events:</h4>
                            <div class="row">
                                <div class="col">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" name="Events" type="checkbox" id="inlineCheckbox1" value="Events" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Events</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" name="Films" type="checkbox" id="inlineCheckbox2" value="Films" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Films</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" name="Shootings" type="checkbox" id="inlineCheckbox3" value="Shootings" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Shootings</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" name="Movies" type="checkbox" id="inlineCheckbox4" value="Movies" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Movies</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" name="Spots" type="checkbox" id="inlineCheckbox5" value="Spots" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Spots</label>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <h4>By Categories:</h4>
                            <div class="row">
                                <div class="col">
                                    <div className="form-check">
                                        <input className="form-check-input" name="Balcony" type="checkbox" id="inlineCheckbox1" value="Balcony" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Balcony</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Bathroom" type="checkbox" id="inlineCheckbox2" value="Bathroom" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Bathroom</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Kitchen" type="checkbox" id="inlineCheckbox3" value="Kitchen" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Kitchen</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Dinning Room" type="checkbox" id="inlineCheckbox4" value="Dinning Room" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Dinning Room</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Office" type="checkbox" id="inlineCheckbox5" value="Office" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Office</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Views City" type="checkbox" id="inlineCheckbox5" value="Views City" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Views City</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Classic Style" type="checkbox" id="inlineCheckbox1" value="Classic Style" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Classic Style</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Forest Views" type="checkbox" id="inlineCheckbox2" value="Forest Views" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Forest Views</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Modern Style" type="checkbox" id="inlineCheckbox3" value="Modern Style" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Modern Style</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div className="form-check">
                                        <input className="form-check-input" name="Parking" type="checkbox" value="Parking" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Parking</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Garden" type="checkbox" value="Garden" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Garden</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Pool" type="checkbox" id="inlineCheckbox1" value="Pool" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Pool</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Elevator" type="checkbox" id="inlineCheckbox2" value="Elevator" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Elevator</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Sea views" type="checkbox" id="inlineCheckbox2" value="Sea views" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Sea views</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Living Room" type="checkbox" id="inlineCheckbox3" value="Living Room" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Living Room</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Industrial" type="checkbox" id="inlineCheckbox4" value="Industrial" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Industrial</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Wood Floor" type="checkbox" id="inlineCheckbox5" value="Wood Floor" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Wood Floor</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Terrace" type="checkbox" id="inlineCheckbox5" value="Terrace" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label">Terrace</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-7">
                        <div class="row">
                            {properties.length ? properties.map(propers => <PropertyCard key={propers.id} data={{ ...propers, userId: this.props.userId }} goEdit={this.props.goEdit} deleteProperty={this.deleteProperty} />) : ""}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    }

}

export default Filters










