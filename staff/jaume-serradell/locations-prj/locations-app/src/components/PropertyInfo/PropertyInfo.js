import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'

class PropertyInfo extends Component {

    state = {
        property: {}
    }

    componentDidMount() {
        return logic.retrieveProperty(this.props.match.params.id)
            .then(property => this.setState(property))
    }

    render() {

        const { categories, description, title, photo, subtitle, type } = this.state.property
        return <div className="container">
        <div className="row">
            <div className="col-5">
                <div className="infoImg">
                    <h4><i className="fa fa-picture-o"></i> Space Image</h4>
                    <img className="img-fluid" src={photo} alt={title} />
                </div>
                <br />
                <button onClick={() => this.props.history.push('/')} className="btn btn-danger"><i className="fa fa-arrow-circle-left"></i> Back</button>
            </div>
            <div className="col-1"></div>
            <div className="col-6">
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
                        {categories ? categories.map(elem => <div key={Math.random()} className="col-3">{elem}</div>) : ""}
                    </div>
                </div>
            </div>
        </div>
    </div>
    }
}

export default withRouter(PropertyInfo)