import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { logic } from '../../logic'
import 'bulma/css/bulma.css'
import Carousel from "../Carousel"
import './home.css'

class Home extends Component {

    state = {
        dogsNotAdopteds: [],
        dogsAdopted: [],
        dog: ''
    }

    componentDidMount() {
        logic.listDogsNotAdopted()
            .then(dogs => {
                this.setState({
                    dogsNotAdopteds: dogs
                })
            })
    }

    showAdopteds = (e) => {
        e.preventDefault()
        logic.listDogsAdopted()
            .then(dogs => {
                this.setState({
                    dogsNotAdopteds: [],
                    dogsAdopted: dogs

                })
            })
    }

    showNotAdopteds = (e) => {
        e.preventDefault()
        logic.listDogsNotAdopted()
            .then(dogs => {
                this.setState({
                    dogsNotAdopteds: dogs,
                    dogsAdopted: []
                })
            })
    }

    render() {
        return <div>
            <nav class="navbar is-fixed-top nav">
                <div class="navbar-start">
                    <a href="/" class="navbar-item logo">MON-GOS</a>
                </div>
                <div class="navbar-end">
                    <a href="/#/search" class="navbar-item"><button class="button search"><i class="fas fa-search"></i></button></a>
                    <nav class="breadcrumb" >
                        <ul>
                            <li>Are you a shelter?</li>
                            <li><a href="/#/register" class="navbar-item goShelter">Register</a></li>
                            <li><a href="/#/login" class="navbar-item goShelter">login</a></li>
                        </ul>
                    </nav>
                </div>
            </nav>
            <Carousel />
            <div class="breadcrumb is-large">
                <ul>
                    <li><a href="" onClick={this.showNotAdopteds} style={this.state.dogsNotAdopteds.length ? { textDecoration: "underline", textDecorationColor: "#8A4D76" } : {}}><h5>For adoption</h5></a></li>
                    <li><a href="" onClick={this.showAdopteds} style={this.state.dogsAdopted.length ? { textDecoration: "underline", textDecorationColor: "#8A4D76" } : {}}><h5>Adopted</h5></a></li>
                </ul>
            </div>
            <div className="container">
                {this.state.dogsNotAdopteds.map(dog => {
                    return <div class="card items">
                        <p class="is-size-3">{`${dog.name}`}</p>
                        <div>
                            <figure class="image is-3by2">
                            <img style={{backgroundImage:`url(${dog.photo})`, height:'215px',backgroundSize:'cover',backgroundPosition:'center'}}/>
                            </figure>
                        </div>
                        <p>{`${dog.gender}`}</p>
                        <Link to={`/detailDog/${dog._id}`}><button class="button is-small more-information">+</button></Link>
                    </div>
                })}
            </div>
            <div className="container">
                {this.state.dogsAdopted.map(dog => {
                    return <div class="card items">
                        <p class="is-size-3">{`${dog.name}`}</p>
                        <div>
                            <figure class="image is-3by2">
                                <img style={{backgroundImage:`url(${dog.photo})`, height:'215px',backgroundSize:'cover'}}/>
                            </figure>
                        </div>
                        <p>{`${dog.gender}`}</p>
                    </div>
                })}
            </div>
        </div >
    }
}
export default withRouter(Home)