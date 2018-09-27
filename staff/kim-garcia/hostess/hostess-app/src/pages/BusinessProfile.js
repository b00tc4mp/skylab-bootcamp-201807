import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import BusinessCard from '../components/BusinessCard'
import HomeButton from '../components/HomeButton'

class BusinessProfile extends Component {
    state = {
        business: '',
    }

    componentDidMount() {
        logic.retrieveBusiness(this.props.id, this.props.token)
            .then(business => {
                this.setState({ business })
            })
    }

    render() {

        const { name, web, boss, phone, philosophy, events, businessCard } = this.state
        const { business } = this.state

        return (
            <div>
                <div className="big">
                    <div className="left">
                        <div>{businessCard}</div>
                    </div>
                    <div className="right">
                        <BusinessCard business={business} />
                        <div>Contact details</div>
                        <div>{business.boss}</div>
                        <div>{business.phone}</div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(BusinessProfile)