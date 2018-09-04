import React, { Component } from 'react'
import { withRouter,Link } from 'react-router-dom'
import { logic } from '../logic'
import DetailDog from './DetailDog'

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
                    dogsAdopted: dogs,
                    dogsNotAdopteds: []
                })
            })
    }

    showNotAdopteds = (e) => {
        e.preventDefault()
        logic.listDogsNotAdopted()
            .then(dogs => {
                this.setState({
                    dogsAdopted: [],
                    dogsNotAdopteds: dogs
                })
            })
    }

    render() {
        return <div>
            <nav>
                <a href="/">Mon-Gos</a>
                <a href="/#/search"><button>Buscador</button></a>
                <a href="/#/login"><button>Entrar</button></a>
                <a href="/#/register"><button>Registro</button></a>
            </nav>
            <p>Imagen principal</p>
            <a href="" onClick={this.showNotAdopteds}><h2>En adopción</h2></a>
            <ul>
                {this.state.dogsNotAdopteds.map(dog => {
                    return <li>
                        {`Nombre: ${dog.name}`}
                        <img src={dog.photo} alt=""/>
                        <Link to={`/detailDog/${dog._id}`}>+ Información</Link>
                    </li>
                }
                )}
            </ul>

            <a href="" onClick={this.showAdopteds}><h2>Adoptados</h2></a>
            <ul>
                {this.state.dogsAdopted.map(dog => {
                    return <li key={dog.id}>
                        {`Nombre: ${dog.name}`}
                        <img src={dog.photo} alt=""/>
                    </li>
                })
                }
            </ul>

        </div>
    }
}
export default withRouter(Home)