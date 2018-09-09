import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { logic } from '../logic'
import swal from 'sweetalert2'

class UpdateDog extends Component {

    state = {
        id: "",
        name: "",
        gender: "",
        age: null,
        weight: null,
        photo: "",
        description: ""
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    componentDidMount() {
        return logic.retrieveDog(this.props.dogId)
            .then(dog => {
                this.setState({
                    id: dog.id,
                    name: dog.name,
                    gender: dog.gender,
                    age: dog.age,
                    weight: dog.weight,
                    photo: dog.photo,
                    description: dog.description
                })
            })
    }

    updateDog = (e) => {
        e.preventDefault()
        let { name, id, gender, age, weight, photo, description } = this.state

        age = parseFloat(age)
        weight = parseFloat(weight)

        logic.updateDog(this.props.id, id, name, gender, age, weight, photo, description, this.props.token)
            .then(() => {
                swal({
                    type: 'success',
                    title: `Updated successfully`,
                    showConfirmButton: true,
                })
                this.props.history.push('/landing')
            })
            .catch(message => (
                swal({
                    type: 'error',
                    title: `${message}`,
                    showConfirmButton: true,
                })
            ))
    }

    render() {
        return <div>
            <nav class="navbar nav">
                <div class="navbar-item">
                    <a href="/#/landing" onClick={this.handleLogout}><button class="button is-dark">Return</button></a>
                </div>
            </nav>
            <div className="container-form">
                <div className="container-title-update">
                    <h1 className="title-update">Update dog</h1>
                    <label class="tag">{this.state.gender}</label>
                </div>
                <form onSubmit={this.updateDog}>
                    <div class="field">
                        <input class="input" type="text" placeholder="Name" maxlength="15" onChange={this.handleChange} value={this.state.name} name="name" />
                    </div>
                        
                    <div class="parameters-dog">
                        <div class="field">
                        <p className="parameter-dog">Age</p>
                            <input class="input" type="number" placeholder="Age" onChange={this.handleChange} name="age" value={this.state.age} />
                        </div>
                        <div class="field">
                        <p className="parameter-dog">Weight</p>
                            <input class="input" type="number" placeholder="Weight" onChange={this.handleChange} name="weight" value={this.state.weight} />
                        </div>
                    </div>
                    <div class="field">
                        <input class="input" type="text" placeholder="Photo" onChange={this.handleChange} name="photo" />
                    </div>
                    <textarea class="textarea is-small" name="description" id="" placeholder="Description" onChange={this.handleChange} value={this.state.description}></textarea>
                    <button class="button is-success" type="submit">Update</button>
                </form>
            </div>
        </div>
    }
}

export default withRouter(UpdateDog)