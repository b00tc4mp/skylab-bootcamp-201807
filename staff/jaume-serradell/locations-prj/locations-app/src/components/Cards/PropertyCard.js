import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './PropertyCard.css'

class PropertyCard extends Component {

    render() {
        const { data: { description, id, photo, categories, title, userId, owner } } = this.props
        return <div className="col-6">
            <div className="card">
                <div className="card-img-top" style={{ backgroundImage: `url(${photo})`, height: "180px", backgroundSize: "cover" }} />
                <div className="card-body">
                    <h4 className="card-title">{title}</h4>
                    <p className="card-text">{description}</p>
                    <br />
                    <div className="row borders">
                        {categories.map(elem => <div key={Math.random()} className="col-6">{elem}</div>)}
                    </div>
                    {(userId !== owner) ? <a onClick={() => this.props.history.push(`/property/${id}`)} className="btn btn-info text-white mt-1"><i className="fa fa-plus"></i> Information</a> : <div>
                        <a onClick={() => this.props.history.push(`/propertyinfo/${id}`)} className="btn btn-info text-white mt-1 mr-2"><i className="fa fa-plus"></i> Details</a>
                        <a onClick={() => this.props.goEdit(id)} className="btn btn-primary text-white mt-1 mr-2">Update</a>
                        <a onClick={() => this.props.deleteProperty(id)} className="btn btn-danger text-white mt-1">Delete</a>
                    </div>}

                </div>
            </div>
            <br />
        </div>
    }
}

export default withRouter(PropertyCard)