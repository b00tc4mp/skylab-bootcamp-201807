import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { logic } from '../../logic'
import swal from 'sweetalert2'
import './landing.css'
import MDSpinner from "react-md-spinner";

class Landing extends Component {

    state = {
        dogs: [],
        loading:true
    }

    componentDidMount() {
        logic.listDogsByShelter(this.props.id, this.props.token)
            .then(dogs => {
                this.setState({
                    loading:false,
                    dogs
                })
            })
    }

    handleLogout = (e) => {
        e.preventDefault()
        this.props.handleLogout(e)
    }

    deleteDog(id) {
        swal({
            title: 'Are you sure?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                swal(
                    'Removed!',
                    'Dog has been remove.',
                    'success'
                )
                logic.removeDog(this.props.id, id, this.props.token)
                    .then(() => this.listDogs())
            }
        })
    }

    listDogs = () => {
        logic.listDogsByShelter(this.props.id, this.props.token)
            .then(dogs => {
                this.setState({
                    loading:false,
                    dogs
                })
            })
    }

    adopted(id) {
        this.setState({
            loading:true
        })
        logic.dogAdopted(this.props.id, id, this.props.token)
            .then(() => this.listDogs())
    }

    notAdopted(id) {
        this.setState({
            loading:true
        })
        logic.dogNotAdopted(this.props.id, id, this.props.token)
            .then(() => this.listDogs())
    }
    render() {
        return <div>
            <nav class="navbar nav">
                <div class="navbar-item">
                    <Link to='/' onClick={this.handleLogout}><button class="button is-dark">Logout</button></Link>
                </div>
            </nav>
            <div className="container-landing">
                <div className="container-list">
                    <div className="container-title-landing">
                        <h2 className="title">DOGS</h2>
                        {this.state.loading ? <MDSpinner /> : ''}
                        <a href="/#/insertDog"><button class="button is-success">Add a dog</button></a>
                    </div>       
                    <ul>
                        {this.state.dogs.map(dog => {
                            if (dog.adopted === false) {
                                return <li>
                                    <div className="element-list">
                                        <img class="image-list" src={dog.photo}></img>
                                        <p className="landing-label">{dog.name}</p>
                                        <p onClick={(e) => {
                                            e.preventDefault();
                                            this.deleteDog(dog._id)
                                        }}>
                                            <button class="button is-danger is-small button-landing">X</button></p>
                                        <Link to={`/updateDog/${dog._id}`} class="button is-light is-small button-landing"> Update/Information</Link>
                                        <p onClick={(e) => {
                                            e.preventDefault()
                                            this.adopted(dog._id)
                                        }}
                                        ><button class="button is-light is-small button-landing">Not adopted</button></p>
                                    </div>
                                </li>
                            } else {
                                return <li>
                                    <div className="element-list">
                                        <img class="image-list" src={dog.photo}></img>
                                        <p className="landing-label">{dog.name} </p><p onClick={(e) => {
                                            e.preventDefault(); this.deleteDog(dog._id)
                                        }}><button class="button is-danger is-small button-landing">X</button></p>
                                        <p onClick={(e) => {
                                            e.preventDefault()
                                            this.notAdopted(dog._id)
                                        }}>
                                            <button class="button is-light is-small button-landing adopted" >Adopted</button></p>
                                    </div>
                                </li>
                            }
                        })}
                    </ul>
                </div>
            </div>
        </div>
    }
}

export default withRouter(Landing)