import React, { Component } from 'react'
import { withRouter,Link } from 'react-router-dom'
import { logic } from '../../logic'
import 'bulma/css/bulma.css'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, } from "react-google-maps";
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody, } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import './detailDog.css'

class DetailDog extends Component {

    state = {
        dog: "",
        shelter: "",
        isMarkerShown: true
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
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={13}
                defaultCenter={{ lat: this.state.shelter.latitude, lng: this.state.shelter.longitude }}>
                <Marker position={{ lat: this.state.shelter.latitude, lng: this.state.shelter.longitude }} />
            </GoogleMap>
        ));

        return <div>
            < nav class="navbar nav" >
                <div class="navbar-start">
                    <Link to='/'><button class="navbar-item logo">MON-GOS</button></Link>
                </div>
            </nav >
            <div className="detailDog">
                <h2 className="title">Information about {this.state.dog.name}</h2>
                <div className="infoDog">
                    <div className="dataDog">
                        <h6>Gender: </h6> <p>{this.state.dog.gender}</p>
                        <h6>Weight:</h6> <p>{this.state.dog.weight} kg.</p>
                        <h6>Age: </h6><p>{this.state.dog.age} years</p>
                        <h6>Description:</h6><p>{this.state.dog.description}</p>
                    </div>
                    <img class="imageDetail" style={{backgroundImage:`url(${this.state.dog.photo})`, height:'215px',backgroundSize:'cover',backgroundPosition:'center'}}/>
                </div>
                <Accordion class="accordion">
                    <AccordionItem>
                        <AccordionItemTitle>
                            <p>Shelter:</p><p>{this.state.shelter.name}</p>
                            <i class="fas fa-chevron-circle-down"></i>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <div className="informationShelter">
                                <div>
                                    <p>Email:</p><p>{this.state.shelter.email}</p>
                                    <p>Address:</p><p>{this.state.shelter.address}</p>
                                    <p>Phone:</p><p>{this.state.shelter.phone}</p>
                                </div>
                                <div>
                                    {this.state.shelter.latitude ? <MapWithAMarker
                                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBBm1O0T3pA22EiQsEOSgrMyl9uHh87p4o&callback=3.exp&libraries=geometry,drawing,places"
                                        loadingElement={<div style={{ height: `100%` }} />}
                                        containerElement={<div style={{ height: `250px`, width: '330px' }} />}
                                        mapElement={<div style={{ height: `100%` }} />}
                                    /> : <div></div>}
                                </div>
                            </div>
                        </AccordionItemBody>
                    </AccordionItem>
                </Accordion>
                <Link to="/adoptar"><button class="button is-success">Adopt</button></Link>
            </div>
        </div >
    }
}
export default withRouter(DetailDog)