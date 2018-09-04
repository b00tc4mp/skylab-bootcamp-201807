import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { logic } from '../logic'

class InsertDog extends Component {
    state = {
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

    insertDog = (e) => {
        e.preventDefault()
        let { name, gender, age, weight, photo, description } = this.state

        age = parseInt(age)
        weight = parseInt(weight)

        logic.insertDog(this.props.id, name, gender, age, weight, photo, description, this.props.token)
            .then(() => {
                this.props.history.push('/landing')
            })
            .catch(message => (
                console.log(message)
            ))
    }



    render() {
        return <div>
            <h2>Insertar perro</h2>
            <form onSubmit={this.insertDog}>
                <input type="text" name="name" placeholder="Nombre" onChange={this.handleChange} />
                <select name="gender" id="" onChange={this.handleChange}>
                    <option value="male" onChange={this.handleChange} default>Macho</option>
                    <option value="female" onChange={this.handleChange}>Hembra</option>
                </select>
                <input type="number" name="age" placeholder="Edad" onChange={this.handleChange} />
                <input type="number" name="weight" placeholder="Peso" onChange={this.handleChange} />
                <input type="text" name="photo" placeholder="Foto" onChange={this.handleChange} />
                <textarea name="description" id="" cols="30" rows="10" placeholder="Descripción" onChange={this.handleChange}></textarea>
                <input type="submit" value="Aceptar" />
            </form>
            <a href="/"><button>Salir</button></a>
        </div>
    }
}

export default withRouter(InsertDog)