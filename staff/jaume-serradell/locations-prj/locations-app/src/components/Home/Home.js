import React, { Component } from 'react';
import Filters from '../Filters/Filters'
import { withRouter } from 'react-router-dom'
import Hero from '../Hero/Hero';
import Property from '../Property/Property'

class Home extends Component {

    state= {
        editId: null
    }

    goEdit = id => {
        this.setState({editId:id})
    }

    render() {
        return !this.state.editId ? <section>
            <Hero />
            <Filters goEdit={this.goEdit} userId={this.props.id} email={this.props.email} token={this.props.token} />  
        </section> : <Property email={this.props.email} token={this.props.token} goEdit={this.goEdit} editId={this.state.editId}  />
    }

}

export default withRouter(Home)