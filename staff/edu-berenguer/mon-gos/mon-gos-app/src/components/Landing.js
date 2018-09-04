import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { logic } from '../logic'

class Landing extends Component {

    state = {
        dogs: []
    }

    componentDidMount() {
        logic.listDogsByShelter(this.props.id, this.props.token)
            .then(dogs => {
                this.setState({
                    dogs
                })
            })
    }

    handleLogout = (e) => {
        e.preventDefault()
        this.props.handleLogout(e)
    }

    deleteDog(id) {
        logic.removeDog(this.props.id, id, this.props.token)
            .then(() => this.listDogs())
    }

    listDogs = () => {
        logic.listDogsByShelter(this.props.id, this.props.token)
            .then(dogs => {
                this.setState({
                    dogs
                })
            })
    }

    adopted(id) {
        logic.dogAdopted(this.props.id, id, this.props.token)
            .then(() => this.listDogs())
    }

    render() {
        return <div>
            <h2>LISTA DE PERROS</h2>
            <ul>
                {this.state.dogs.map(dog => {
                    if (dog.adopted === false) {
                        return <li>
                            {dog.name} <a href="" onClick={(e) => {
                                e.preventDefault(); 
                                this.deleteDog(dog._id)}}
                                >X</a>
                            {/* <a href="/#/updateDog">Update</a> */}
                            <Link to={`/updateDog/${dog._id}`}> Update</Link>
                            <a href="" onClick={(e) => { 
                                e.preventDefault(); 
                                this.adopted(dog._id)}}
                                >No adoptado</a>
                        </li>
                    } else {
                        return <li>
                            {dog.name} <a href="" onClick={(e) => {
                                e.preventDefault(); this.deleteDog(dog._id)
                            }}>X</a>
                            Adoptado
                        </li>
                    }

                })}
            </ul>
            <a href="/" onClick={this.handleLogout}><button>Salir</button></a>
            <a href="/#/insertDog"><button>Insertar Perro</button></a>
        </div>
    }
}


export default withRouter(Landing)