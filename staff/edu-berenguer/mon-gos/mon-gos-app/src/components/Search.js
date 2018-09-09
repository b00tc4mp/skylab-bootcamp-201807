import React, { Component } from 'react'
import { logic } from '../logic'
import { withRouter, Link } from 'react-router-dom'

class Search extends Component {

    state = {
        gender: '',
        age: '',
        weight: '',
        dogsByQuery: ''
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }


    componentDidMount() {
        logic.listDogsByQuery(this.state.gender, this.state.age, this.state.weight)
            .then(dogs => {
                this.setState({
                    dogsByQuery: dogs
                })
            })
    }

    listDogs = (e) => {
        e.preventDefault()
        return Promise.resolve()
            .then(() => {
                const { gender, age, weight } = this.state
                return logic.listDogsByQuery(gender, age, weight)
            })
            .then(dogs => {
                this.setState({
                    dogsByQuery: dogs
                })
            })


    }


    render() {
        return <div>
            <nav class="navbar nav">
                <div class="navbar-start">
                    <a href="/" class="navbar-item logo">MON-GOS</a>
                </div>
                <div class="navbar-end">
                    <nav class="breadcrumb has-succeeds-separator" >
                        <ul>
                            <li>Are you a shelter?</li>
                            <li><a href="/#/register" class="navbar-item goShelter ">Register</a></li>
                            <li><a href="/#/login" class="navbar-item goShelter">login</a></li>
                        </ul>
                    </nav>
                </div>
            </nav>
            <div>
                <form onChange={this.listDogs}>
                    <div class="select" >
                        <select name="gender" id="" onChange={this.handleChange}>
                            <option value="">Both</option>
                            <option value="male" onChange={this.handleChange}>Male</option>
                            <option value="female" onChange={this.handleChange}>Female</option>
                        </select>
                    </div>
                    <div class="select">
                        <select class="select" name="weight" id="" onChange={this.handleChange}>
                            <option value="">All</option>
                            <option value="little" onChange={this.handleChange}>Little</option>
                            <option value="medium" onChange={this.handleChange}>Medium</option>
                            <option value="big" onChange={this.handleChange}>Big</option>
                        </select>
                    </div>
                    <div class="select">
                        <select name="age" id="" onChange={this.handleChange}>
                            <option value="">All</option>
                            <option value="puppy" onChange={this.handleChange}>Puppy</option>
                            <option value="young" onChange={this.handleChange}>Young</option>
                            <option value="adult" onChange={this.handleChange}>Adult</option>
                            <option value="senior" onChange={this.handleChange}>Senior</option>
                        </select>
                    </div>
                </form>
            </div>
            <div className="container">
                {this.state.dogsByQuery && this.state.dogsByQuery.map(dog => {
                    return <div class="card items">
                        <p class="is-size-3">{`${dog.name}`}</p>
                        <div>
                            <figure class="image is-3by2">
                                <img src={dog.photo} alt="" />
                            </figure>
                        </div>
                        <p>{`${dog.gender}`}</p>
                        <Link to={`/detailDog/${dog._id}`}><button class="button is-small more-information">+</button></Link>
                    </div>
                })}
            </div>
        </div>
    }
}

export default withRouter(Search)
