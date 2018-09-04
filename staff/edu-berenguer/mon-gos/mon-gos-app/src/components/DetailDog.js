import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { logic } from '../logic'

class DetailDog extends Component {

    state = {
        dog: ""
    }

    componentDidMount() {
       return logic.retrieveDog(this.props.id)
            .then(dog => {
                this.setState({ dog })
            })
    }


    render() {
        return <div>
            <main>
                <h2>Información de {this.state.dog.name}</h2>
                <div>
                    Género : {this.state.dog.gender}
                    Peso: {this.state.dog.weight}
                    Edad : {this.state.dog.age}
                    <img src={this.state.dog.photo}/>
                    Text:{this.state.dog.description}
                </div>
            </main>

            <a href="/"><button>Salir</button></a>
            <a href="/#/adoptar"><button>Adoptar</button></a>
        </div>
    }
}


export default withRouter(DetailDog)