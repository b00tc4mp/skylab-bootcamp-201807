import React, { Component } from 'react'
import { logic } from '../../logic'
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
                    <Link to={'/'}><button class="navbar-item logo">MON-GOS</button></Link>
                </div>
                <div class="navbar-end">
                    <nav class="breadcrumb" >
                        <ul>
                            <li>Are you a shelter?</li>
                            <li><Link to={'/register'}><li class="navbar-item goShelter">Register</li></Link></li>
                            <li><Link to={'/login'}><li class="navbar-item goShelter">Login</li></Link></li>
                        </ul>
                    </nav>
                </div>
            </nav>
            <div>
                <form onChange={this.listDogs}>
                    <div class="select" >
                        <select name="gender" id="" onChange={this.handleChange}>
                            <option value="">All genders</option>
                            <option value="male" onChange={this.handleChange}>Male</option>
                            <option value="female" onChange={this.handleChange}>Female</option>
                        </select>
                    </div>
                    <div class="select">
                        <select class="select" name="weight" id="" onChange={this.handleChange}>
                            <option value="">All sizes</option>
                            <option value="little" onChange={this.handleChange}>Little</option>
                            <option value="medium" onChange={this.handleChange}>Medium</option>
                            <option value="big" onChange={this.handleChange}>Big</option>
                        </select>
                    </div>
                    <div class="select">
                        <select name="age" id="" onChange={this.handleChange}>
                            <option value="">All ages</option>
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
                            <img style={{backgroundImage:`url(${dog.photo})`, height:'215px',backgroundSize:'cover',backgroundPosition:'center'}}/>
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
