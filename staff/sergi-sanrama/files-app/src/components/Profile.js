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
                    &gt;<a href="/#/files">Go Back</a><br/>
                </nav>
                <form onSubmit={this.onUpdateProfile}>
                    <label>Update Password</label><br/>
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                    <input type="password" name="newPassword" placeholder="New password" value={this.state.newPassword} onChange={this.handleChange} />

                    <button type="submit">¡Change it!</button>
                </form>
               
            </div>
        </main>
    }




}

export default Profile