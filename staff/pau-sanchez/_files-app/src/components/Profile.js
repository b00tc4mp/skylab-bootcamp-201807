import React, { Component } from 'react'
import logic from '../logic'

class Profile extends Component {
    
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
      
      onUpdateProfile = e => {
        e.preventDefault()
        const {password,newPassword} = this.state
        const {username,token} = this.props
        logic.updateProfile(username,password,newPassword,token)
          .then(res => console.log(res))
          .catch(({ message }) => alert(message))
      }
   
    
    
    render() {
        

        return <main>
            <div className="screen">
                <nav>
                    &gt; Return to  <a href="/#/files">files</a><br/>
                </nav>
                <form onSubmit={this.onUpdateProfile}>
                    <label>Change Password</label><br/>
                    <input type="password" name="password" placeholder="current password" value={this.state.password} onChange={this.handleChange} /><br/>
                    <input type="password" name="newPassword" placeholder="new password" value={this.state.newPassword} onChange={this.handleChange} /><br/>
                    
                    
                    
                    <button type="submit">Update Password</button>
                </form>
               
            </div>
        </main>
    }




}

export default Profile