import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { logic } from '../../logic'
import swal from 'sweetalert2'
import FileBase64 from "react-file-base64"
import './insertDog.css'
import MDSpinner from "react-md-spinner"

class InsertDog extends Component {
    state = {
        name: "",
        gender: "",
        age: null,
        weight: null,
        photo: "",
        description: "",
        files: "",
        loading:true
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
                    photo,
                    loading:true
                     })
            })
            .catch(({ message }) => {
                swal({
                    type: 'error',
                    title: `${message}`,
                })
            })
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
                    <Link to={'/'}><button class="button is-success">Return</button></Link>
                </div>
            </nav>
            <div>
                <div className="container-title-add">
                    <h1 className="title">Add dog</h1>
                </div>
                <form onSubmit={this.insertDog} className="form-add">
                    <div>
                        <div class="select is-fullwidth" >
                            <select name="gender" id="" onChange={this.handleChange}>
                                <option value="" hidden >-- Choose gender --</option>
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
                        <textarea class="textarea" placeholder="Description..." maxlength="200" onChange={this.handleChange} name="description"></textarea>
                        <input class="button is-success" type="submit" value="Accept" />
                    </div>
                    <div>
                        <div className="container-input">
                            <FileBase64 className="input" multiple={false} onDone={this.getFiles} />
                        </div>
                        <div>
                            <div>{this.state.photo ? <img src={this.state.photo}></img> : ""}</div>
                            <div className="spinner">{!this.state.loading ? <MDSpinner /> : ''}</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    }
}

export default withRouter(InsertDog)