import React, { Component } from 'react';
import './Filters.css'

class Filters extends Component {

    render() {
        return <div className="container">
            <form>
                <div className="row">
                    <div className="col-4">
                        <div className="filterBox">
                            <h4>By Type:</h4>
                            <div className="form-group">
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
                            <br />
                            <h4>By Events:</h4>
                            <div class="row">
                                <div class="col">
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
                                </div>
                                <div class="col">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" name="Movies" type="checkbox" id="inlineCheckbox4" value="option4" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" for="inlineCheckbox4">Movies</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" name="Spots" type="checkbox" id="inlineCheckbox5" value="option5" onChange={this.onCheckboxChanged} />
                                        <label className="form-check-label" for="inlineCheckbox5">Spots</label>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <h4>By Categories:</h4>
                            <div class="row">
                                <div class="col">
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
                                </div>
                                <div class="col">
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
                    <div className="col-1"></div>
                    <div className="col-7">
                        <div class="row">
                            <div class="col">
                                <div class="card">
                                    <img class="card-img-top" src=".../100px180/" alt="Card image cap" />
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" class="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card">
                                    <img class="card-img-top" src=".../100px180/" alt="Card image cap" />
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" class="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card">
                                    <img class="card-img-top" src=".../100px180/" alt="Card image cap" />
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" class="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    }

}

export default Filters
                                








                            
                            