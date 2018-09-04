import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { logic } from '../logic'


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

        age = parseInt(age)
        weight = parseInt(weight)

        logic.updateDog(this.props.id, id, name, gender, age, weight, photo, description, this.props.token)
            .then(() => {
                this.props.history.push('/landing')
            })
            .catch(message => (
                console.log(message)
            ))
    }



    render() {
        return <div>
            <h2>Actualizar Perro</h2>
            <form onSubmit={this.updateDog}>
                <input type="text" name="name" placeholder="Nombre" onChange={this.handleChange} value={this.state.name} />
                <select name="gender" id="" onChange={this.handleChange} value={this.state.gender}>
                    <option value="male" onChange={this.handleChange} default>Macho</option>
                    <option value="female" onChange={this.handleChange}>Hembra</option>
                </select>
                <input type="number" name="age" placeholder="Edad" onChange={this.handleChange} value={this.state.age} />
                <input type="number" name="weight" placeholder="Peso" onChange={this.handleChange} value={this.state.weight} />
                <img src={this.state.photo} />
                <textarea name="description" id="" cols="30" rows="10" placeholder="Descripción" onChange={this.handleChange} value={this.state.description}></textarea>
                <input type="submit" value="Actualizar" />
            </form>
            <a href="/"><button>Salir</button></a>
        </div>
    }

}

export default withRouter(UpdateDog)