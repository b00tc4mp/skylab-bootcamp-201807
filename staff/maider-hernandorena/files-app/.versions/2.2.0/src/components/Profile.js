import React, { Component } from 'react';
import logic from '../logic'

class Profile extends Component{

  state = {
    password: "",
    newPassword: "",
    error : "",
    updated: ""
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onUpdateSubmit = e => {
    e.preventDefault()
    const {password,newPassword} = this.state
    const {username,token} = this.props
    logic.updateProfile(username,password,newPassword,token)
      .then(({message}) => this.setState({updated: message}))
      .catch(({ message }) => this.setState({error: message}))
  }

  render(){
    const {error, updated} = this.state
    return <main>
            <div className="screen">
              <h2>Update your profile</h2>
              <form onSubmit={this.onUpdateSubmit}>
                <input type="text" name="username" placeholder="username" disabled value={this.props.username} />
                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
                <input type="password" name="newPassword" placeholder="New password" value={this.state.newPassword} onChange={this.handleChange} />
                <button type="submit">Update</button>
              </form>
              {error && <p>{error}</p>}
              {updated && <p>{updated}</p>}
              <p>Go back to <a href="/#/files">Files</a></p>
            </div>
          </main>
  }
  
  
}

export default Profile