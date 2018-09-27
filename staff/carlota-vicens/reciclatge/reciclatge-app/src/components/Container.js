import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Navbar from './NavBar.js'

import './styles/Container.css'

class Container extends Component {

    constructor(props) {
        super(props);
        this.state = {
            namecontainer: this.props.namecontainer
        }
    }

    render() {
        const { state: { namecontainer } } = this
        return (
            <div className='container'>
                <h2 className='container__title'>Container</h2>
                <Navbar />
                <h4 className='container__text'>This object goes to {namecontainer} </h4>
                {namecontainer ? <img alt="" className="container__image" src={`./${namecontainer}.png`} /> : ""}
            </div>
        )
    }

}



export default withRouter(Container)


