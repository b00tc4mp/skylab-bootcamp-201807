import React, { Component } from 'react'
import logic from '../logic'

class BusinessCard extends Component {

    // state = {
    //     name: '',
    //     web: '',
    //     philosophy: '',
    //     businessCard: ''
    // }

    acceptRequest = (event) => {
        event.preventDefault()

        logic.acceptRequest(this.props.idH, this.props.business.id, this.props.token)
            .then(() => true)
    }

    render() {

        const { request, business } = this.props

        return (
            <div className="card">
                <div className="big">
                    {
                        request && (
                            <div className="left">
                                <div className="foto card">
                                    {business.businessCard}
                                </div>
                            </div>
                        )
                    }
                    <div className="right without-card">
                        <div>
                            <div>{business.name}</div>
                            <div>{business.philosophy}</div>
                            <div>{business.web}</div>
                        </div>
                    </div>
                    {
                        request && (<div>
                            <button onClick={this.acceptRequest} className="regular-button">Accept request</button>
                        </div>)
                    }
                </div>
            </div>
        )
    }

}

export default BusinessCard
