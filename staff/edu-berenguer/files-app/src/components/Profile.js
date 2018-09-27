import React, { Component } from 'react';
import logic from '../logic'
import { METHODS } from 'http';

class Profile extends Component{

  state = {
    password: "",
    newPassword: "",
    error : "",
    messageUpdate: ""
  }

  // handleChange = e => {
  //   const { name, value } = e.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  onPasswordChanged = e => this.setState({ password: e.target.value })

  onNewPasswordChanged = e => this.setState({ newPassword: e.target.value })

  onUpdateSubmit = (e) => {
    e.preventDefault()
    const {password,newPassword} = this.state
    const {username,token} = this.props
    logic.updateProfile(username,password,newPassword,token)
      .then((res) => this.setState({ 
        messageUpdate:res.message,
        error: ""
      }))
      // .catch(({ message }) => alert(message))
      .catch(({ message }) => this.setState({ 
        messageUpdate:'',
        error: message 
      }))
  
  }



  render(){
    const {error,messageUpdate} = this.state
    return <main>
    <div className="screen">
    <a href={`/#/files`}>Files</a>
      <form onSubmit={this.onUpdateSubmit}>
        {/* <input type="text" name="username" placeholder="username" disabled value={this.props.username} /> */}
        <p>Update Password</p>
        <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.onPasswordChanged} />
        <input type="password" name="newPassword" placeholder="New password" value={this.state.newPassword} onChange={this.onNewPasswordChanged} />
        <button type="submit">login</button>
      </form>
      {messageUpdate && <p>{messageUpdate}</p>}
      {error && <p>{error}</p>}
    </div>
  </main>
  }
  
  
}

export default Profile