import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { logic } from '../logic'
import swal from 'sweetalert2'

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

        age = parseFloat(age)
        weight = parseFloat(weight)

        logic.insertDog(this.props.id, name, gender, age, weight, photo, description, this.props.token)
            .then(() => {
                this.props.history.push('/landing')
            })
            .catch(message => (
                swal({
                    type: 'error',
                    title: `${message}`,
                    showConfirmButton: true,
                })
            )
            )
    }



    render() {
        return <div>
            <nav class="navbar nav">
                <div class="navbar-item">
                    <a href="/"><button class="button is-success">Return</button></a>
                </div>
            </nav>
            <div class="container-form">
                <h1 className="titleDetailForm">Add dog</h1>
                <form onSubmit={this.insertDog}>
                    <div class="select is-fullwidth" >
                        <select name="gender" id="" onChange={this.handleChange}>
                            <option value="" hidden >-- Choose an option --</option>
                            <option value="male" onChange={this.handleChange}>Male</option>
                            <option value="female" onChange={this.handleChange}>Female</option>
                        </select>
                    </div>
                    <div class="field">
                        <p class="control">
                            <input class="input" type="text" placeholder="Name" maxlength="15" onChange={this.handleChange} name="name" />
                        </p>
                    </div>
                    <div class="parameters-dog">
                        <div class="field">
                            <p class="control">
                                <input class="input" type="number" placeholder="Age" min="0" step="0.1" onChange={this.handleChange} name="age" />
                            </p>
                        </div>
                        <div class="field">
                            <p class="control">
                                <input class="input" type="number" placeholder="Weight" min="0" step="0.1" onChange={this.handleChange} name="weight" />
                            </p>
                        </div>
                    </div>
                    <div class="field">
                        <p class="control">
                            <input class="input" type="text" placeholder="photo" onChange={this.handleChange} name="photo" />
                        </p>
                    </div>
                    <textarea class="textarea" placeholder="Description..." maxlength="200" onChange={this.handleChange} name="description"></textarea>
                    <input class="button is-success" type="submit" value="Accept" />
                </form>
            </div>
        </div>
    }
}

export default withRouter(InsertDog)