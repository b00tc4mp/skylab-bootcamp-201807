import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { logic } from '../logic'
import 'bulma/css/bulma.css'

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';


class DetailDog extends Component {

    state = {
        dog: "",
        shelter: ""
    }

    componentDidMount() {
        return logic.retrieveDog(this.props.id)
            .then(dog => {
                this.setState({ dog })
                return logic.retrieveShelter(dog.shelter)
                    .then(shelter => {
                        this.setState({ shelter })
                    })
            })
    }

    render() {
        return <div>
            <nav class="navbar nav">
                <div class="navbar-start">
                    <a href="/" class="navbar-item">DOGGY</a>
                </div>
            </nav>
            <div className="detailDog">
                <h2 className="titleDetaildDog">Information of {this.state.dog.name}</h2>
                <div className="infoDog">
                    <div className="dataDog">
                        <label>Gender: </label> <p>{this.state.dog.gender}</p>
                        <label>Weight:</label> <p>{this.state.dog.weight} kg.</p>
                    <label>Age: </label><p>{this.state.dog.age} years</p>
                    <label>Text:</label><p>{this.state.dog.description}</p>
                    </div>
                    <img class="imageDetail" src={this.state.dog.photo} />
                </div>
                <Accordion>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <label>Shelter:</label><p>{this.state.shelter.name}</p>
                            <i class="fas fa-chevron-circle-down"></i>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <p>Email:</p><p>{this.state.shelter.email}</p>
                            <p>Address:</p><p>{this.state.shelter.address}</p>
                            <p>Phone:</p><p>{this.state.shelter.phone}</p>
                        </AccordionItemBody>
                    </AccordionItem>
                </Accordion>
                <a href="/#/adoptar"><button class="button is-success">Adopt</button></a>
            </div>
        </div>
    }
}
export default withRouter(DetailDog)