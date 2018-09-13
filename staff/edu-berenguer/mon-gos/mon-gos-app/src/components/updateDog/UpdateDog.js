import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { logic } from '../../logic'
import swal from 'sweetalert2'
import FileBase64 from "react-file-base64"
import './updateDog.css'
import MDSpinner from "react-md-spinner"

class UpdateDog extends Component {

    state = {
        id: "",
        name: "",
        gender: "",
        age: null,
        weight: null,
        photo: "",
        description: "",
        loading: true,
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

    getFiles = files => {
        this.setState({
            loading:false
        })
        this.uploadDogPhoto(files.base64)
    }

    uploadDogPhoto(photo) {
        logic.uploadDogPhoto(photo)
            .then(photo => {
                this.setState({ 
                    loading:true,
                    photo 
                })
            })
            .catch(({ message }) => {
                swal({
                    type: 'error',
                    title: `${message}`,
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
                    <Link to='/landing' onClick={this.handleLogout}><button class="button is-dark">Return</button></Link>
                </div>
            </nav>
            <div>
                <div className="container-title-update">
                    <h1 className="title">Edit dog/Information</h1>
                    <label class="tag">{this.state.gender}</label>
                </div>
                <form onSubmit={this.updateDog} className="form-update">
                    <div>
                        <div class="field">
                            <input class="input" type="text" placeholder="Name" maxlength="15" onChange={this.handleChange} value={this.state.name} name="name" />
                        </div>
                        <div className="parameters-dog">
                            <div class="field">
                                <p className="parameter-dog">Age</p>
                                <input class="input" type="number" placeholder="Age" min="0" step="0.1" onChange={this.handleChange} name="age" value={this.state.age} />
                            </div>
                            <div class="field">
                                <p className="parameter-dog">Weight</p>
                                <input class="input" type="number" placeholder="Weight" min="0" step="0.1" onChange={this.handleChange} name="weight" value={this.state.weight} />
                            </div>
                        </div>
                        <textarea class="textarea" name="description" maxlength="200" placeholder="Description" onChange={this.handleChange} value={this.state.description}></textarea>
                        <button class="button is-success" type="submit">Update</button>
                    </div>
                    <div>
                        <div className="container-input"><FileBase64 class="file" multiple={false} onDone={this.getFiles} /></div>
                        <div>{this.state.photo ? <img src={this.state.photo}></img> : ""}</div>
                        {!this.state.loading ? <MDSpinner /> : ''}
                    </div>
                </form>
            </div>
        </div>
    }
}

export default withRouter(UpdateDog)