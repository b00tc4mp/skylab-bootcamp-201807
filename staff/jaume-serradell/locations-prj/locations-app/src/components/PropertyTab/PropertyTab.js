import React, { Component } from 'react';
import './PropertyTab.css'

class PropertyTab extends Component {

    render() {
        return <div className="container">
            <div className="row">
                <div className="col-6">
                    <div className="infoImg">
                        <h4><i className="fa fa-picture-o"></i> Space Image</h4>
                        <img src="https://dummyimage.com/540x200/000/fff&text=Photo" />
                    </div>
                    <br />
                    <h4><i className="fa fa-info-circle"></i> Space Information</h4>
                    <div className="infoBox top">
                        <p className="title">Penthouse SuperCool</p>
                        <p className="subtitle">Ideal para películas de acción</p>
                        <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fermentum interdum elit, non dictum dui mollis eget. Sed id luctus tortor. Vestibulum feugiat venenatis vehicula. Vestibulum pulvinar dapibus consequat. Donec et nibh eu risus lobortis tempor eget sit amet tellus. Vestibulum malesuada aliquam magna, eu condimentum elit euismod ut.</p>
                    </div>
                    <br/>
                    <h4><i className="fa fa-star-o"></i> Space Features</h4>
                    <div className="infoBox bottom">
                        <div className="row">
                            <div className="col">
                            Events
                            </div>
                            <div className="col">
                            Films
                            </div>
                            <div className="col">
                            Shootings
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                            Dinning room
                            </div>
                            <div className="col">
                            Spots
                            </div>
                            <div className="col">
                            Movies
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                            Events
                            </div>
                            <div className="col">
                            Films
                            </div>
                            <div className="col">
                            Shootings
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-1"></div>
                <div className="col-5">
                <form>
                    <h4><i className="fa fa-envelope-o"></i> Contact</h4>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Telephone" />
                    </div>
                    <div className="form-group">
                        <label>Use for:</label>
                        <select className="form-control text-muted">
                            <option selected>Choose...</option>
                            <option name="Penthouse">Penthouse</option>
                            <option name="Houses">Houses</option>
                            <option name="Events Spaces">Events Spaces</option>
                            <option name="Singular Spaces">Singular Spaces</option>
                            <option name="Loft">Loft</option>
                            <option name="Flats">Flats</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Comments</label>
                        <textarea className="form-control" rows="3"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Send</button>
                    </form>
                </div>
            </div>
        </div>
    }
}

export default PropertyTab