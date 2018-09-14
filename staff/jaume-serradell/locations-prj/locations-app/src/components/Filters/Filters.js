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

    resetFilters = e => {
        this.setState({
            type:'',
            categories:[]
        },() => {
            this.myFormRef.reset()
            return this.listProperties()
        })
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
            <form ref={(el) => this.myFormRef = el}>
                <div className="row">
                    <div className="col-4">
                        <div className="filterBox">
                            <h4>By Type:</h4>
                            <div className="form-group">
                                <select className="form-control text-muted" onChange={this.onTypeChanged} value={this.state.type}>
                                    <option defaultValue value="all" name="all">All types</option>
                                    <option value="Penthouse" name="Penthouse">Penthouses</option>
                                    <option value="Houses" name="Houses">Houses</option>
                                    <option value="Events Spaces" name="Events Spaces">Events Spaces</option>
                                    <option value="Singular Spaces" name="Singular Spaces">Singular Spaces</option>
                                    <option value="Loft" name="Loft">Lofts</option>
                                    <option value="Flats" name="Flats">Flats</option>
                                </select>
                            </div>
                            <br />
                            <h4>By Events:</h4>
                            <div className="row">
                                <div className="col">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" name="Events" type="checkbox" id="Events" value="Events" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" htmlFor="Events">Events</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" name="Shootings" type="checkbox" id="Shootings" value="Shootings" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" htmlFor="Shootings">Shootings</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" name="Movies" type="checkbox" id="Movies" value="Movies" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" htmlFor="Movies">Movies</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" name="Spots" type="checkbox" id="Spots" value="Spots" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" htmlFor="Spots">Spots</label>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <h4>By Categories:</h4>
                            <div className="row">
                                <div className="col">
                                    <div className="form-check">
                                        <input className="form-check-input" name="Balcony" type="checkbox" id="Balcony" value="Balcony" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" htmlFor="Balcony">Balcony</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Bathroom" type="checkbox" id="Bathroom" value="Bathroom" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" htmlFor="Bathroom">Bathroom</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Kitchen" type="checkbox" id="Kitchen" value="Kitchen" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" htmlFor="Kitchen">Kitchen</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Dinning Room" type="checkbox" id="Dinning Room" value="Dinning Room" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" htmlFor="Dinning Room">Dinning Room</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Office" type="checkbox" id="Office" value="Office" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" htmlFor="Office">Office</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Views City" type="checkbox" id="Views City" value="Views City" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" htmlFor="Views City">Views City</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Classic Style" type="checkbox" id="Classic Style" value="Classic Style" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" htmlFor="Classic Style">Classic Style</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Forest Views" type="checkbox" id="Forest Views" value="Forest Views" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" htmlFor="Forest Views">Forest Views</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Modern Style" type="checkbox" id="Modern Style" value="Modern Style" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" htmlFor="Modern Style">Modern Style</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-check">
                                        <input className="form-check-input" name="Parking" type="checkbox" id="Parking" value="Parking" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" htmlFor="Parking">Parking</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Garden" type="checkbox" id="Garden" value="Garden" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" htmlFor="Garden">Garden</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Pool" type="checkbox" id="Pool" value="Pool" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" htmlFor="Pool">Pool</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Elevator" type="checkbox" id="Elevator" value="Elevator" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" htmlFor="Elevator">Elevator</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Sea views" type="checkbox" id="Sea views" value="Sea views" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" htmlFor="Sea views">Sea views</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Living Room" type="checkbox" id="Living Room" value="Living Room" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" htmlFor="Living Room">Living Room</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Industrial" type="checkbox" id="Industrial" value="Industrial" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" htmlFor="Industrial">Industrial</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Wood Floor" type="checkbox" id="Wood Floor" value="Wood Floor" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" htmlFor="Wood Floor">Wood Floor</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name="Terrace" type="checkbox" id="Terrace" value="Terrace" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" htmlFor="Terrace">Terrace</label>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary mt-4" onClick={this.resetFilters}>Clear Filters</button>
                        </div>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-7">
                        <div className="row">
                            {properties.length ? properties.map(propers => <PropertyCard key={propers.id} data={{ ...propers, userId: this.props.userId }} goEdit={this.props.goEdit} deleteProperty={this.deleteProperty} />) : ""}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    }

}

export default Filters










