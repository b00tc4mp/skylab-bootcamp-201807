import React, { Component } from 'react';
import './PropertyTab.css'
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom'
import logic from '../../logic'

class PropertyTab extends Component {

    state = {
        property: {}
    }

    componentDidMount() {
        return logic.retrieveProperty(this.props.match.params.id)
            .then(property => this.setState(property))
    }

    onFormSend = e => {
        e.preventDefault()

        swal({
            title: "Message Send!",
            icon: "success",
            button: "Ok!",
        });

        this.props.history.push('/')
    }


    render() {
        const { categories, description, title, photo, subtitle, type } = this.state.property
        return <div className="container">
            <div className="row">
                <div className="col-6">
                    <div>
                        <h4><i className="fa fa-picture-o"></i> Space Image</h4>
                        <div className="imgBig" style={{backgroundImage: `url(${photo})`}}></div>
                    </div>
                    <br />
                    <h4><i className="fa fa-info-circle"></i> Space Information</h4>
                    <div className="infoBox top">
                        <p className="title">{title}</p>
                        <p className="subtitle">{subtitle}</p>
                        <p className="description">{description}</p>
                    </div>
                    <br />
                    <h4><i className="fa fa-home"></i> Space Type</h4>
                    <div className="infoBox bottom">
                        <p>{type}</p>
                    </div>
                    <br />
                    <h4><i className="fa fa-star-o"></i> Space Features</h4>
                    <div className="infoBox bottom">
                        <div className="row">
                            {categories ? categories.map(elem => <div className="col-3">{elem}</div>) : ""}
                        </div>
                    </div>
                    <br />
                    <button onClick={() => this.props.history.push('/')} className="btn btn-danger"><i className="fa fa-arrow-circle-left"></i> Back</button>
                </div>
                <div className="col-1"></div>
                <div className="col-5">
                    <form className="contactForm">
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
                            <label>Comments</label>
                            <textarea className="form-control" rows="3"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={this.onFormSend}>Send</button>
                    </form>
                </div>
            </div>
        </div>
    }
}

export default withRouter(PropertyTab)