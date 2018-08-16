import React, { Component } from 'react';
import logic from '../logic'

class Profile extends Component{

  state = {
    password: "",
    newPassword: "",
    succeeded: false,
    error: ''
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onUpdateSubmit = (event) => {
    event.preventDefault()
    const {password,newPassword} = this.state
    const {username,token} = this.props
    logic.updateProfile(username,password,newPassword,token)
      .then(res => this.setState({ succeeded: true }))
      .catch(({ message }) => this.setState({ error: message, password: '', newPassword:'' }))
  }



  render(){
    const {succeeded, error} = this.state
    return <main>
   {!succeeded ? <div className="screen">
      <form onSubmit={this.onUpdateSubmit}>
        <input type="text" name="username" placeholder="username" disabled value={this.props.username} />
        <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
        <input type="password" name="newPassword" placeholder="New password" value={this.state.newPassword} onChange={this.handleChange} />
        <button type="submit">Update</button>
      </form>
      {error && <p>{error}</p>}
    </div> : <div className="screen">
                    <nav>
                        &gt; User update successfully, now you can proceed to <a href="/#/files">files</a> <span className="blink">_</span>
                    </nav>
                </div>}
  </main>
  }
  
  
}

export default Profile