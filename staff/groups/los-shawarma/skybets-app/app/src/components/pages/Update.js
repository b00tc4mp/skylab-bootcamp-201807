import React, { Component } from 'react';

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
            <h1>Update Profile</h1>
            <form onSubmit={this.submitUpdate}>
                <label>Username</label>
                <div>{this.state.username}</div>
                <label>Password</label>
                <input type="password" placeholder="type current password" onChange={this.keepPassword}/>
                <label>New Username (optional)</label>
                <input type="text" placeholder="type new Username" onChange={this.keepNewUsername}/>
                <label>New Password (optional)</label>
                <input type="password" placeholder="type new Password" onChange={this.keepNewPassword}/>
                <button type="submit">Update Profile</button>
            </form>
        </section>
        )
        
    }
}

export default Update;