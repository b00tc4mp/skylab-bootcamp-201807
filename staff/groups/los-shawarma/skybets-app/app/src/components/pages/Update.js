import React, { Component } from 'react'
import './Update.css';

class Update extends Component {

    state = {
        username: this.props.username,
        password: null,
        newPassword: null,
        newUsername: null
    }

    keepNewUsername = e => this.setState({newUsername: e.target.value})

    keepNewPassword = e => this.setState({newPassword: e.target.value})

    keepPassword = e => this.setState({password: e.target.value})
    
    submitUpdate = e => {
        e.preventDefault()
        this.props.onUpdateProp(this.state.password, this.state.newUsername, this.state.newPassword)
    }

    
    render () {
        return (
        <section>
            <form className="form-update" onSubmit={this.submitUpdate}>
                <h1 className="h3 mb-3 font-weight-normal">Update Profile</h1>
                <div className="sr-info">
                    <label>Current Username: </label>
                    <span> {this.state.username}</span>
                </div>
                <label className="sr-only">Password</label>
                <input className="form-control" type="password" placeholder="type current password" onChange={this.keepPassword}/>
                <label className="sr-only">New Username (optional)</label>
                <input className="form-control" type="text" placeholder="type new Username" onChange={this.keepNewUsername}/>
                <label className="sr-only">New Password (optional)</label>
                <input className="form-control" type="password" placeholder="type new Password" onChange={this.keepNewPassword}/>
                <button className="btn btn-lg btn-block" type="submit">Update Profile</button>
            </form>
        </section>
        )        
    }
}

export default Update;