import React, { Component } from 'react';
import logic from '../logic'

class Profile extends Component{

  state = {
    password: "",
    newPassword: "",
    error : ""
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onUpdateSubmit = (e) => {
    e.preventDefault()
    const {password,newPassword} = this.state
    const {username,token} = this.props
    logic.updateProfile(username,password,newPassword,token)
      .then(res => console.log(res))
      .catch(({ message }) => alert(message))
  }



  render(){
    const {error} = this.state
    return <main>
    <div className="screen">
      <form onSubmit={this.onUpdateSubmit}>
        <input type="text" name="username" placeholder="username" disabled value={this.props.username} />
        <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
        <input type="password" name="newPassword" placeholder="New password" value={this.state.newPassword} onChange={this.handleChange} />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  </main>
  }
  
  
}

export default Profile